aws dynamodb query --endpoint-url http://localhost:8000 --table-name USA_States --key-condition-expression "#st = :st AND #dt > :dt" --expression-attribute-names '{"#st": "state", "#dt": "date"}'  --expression-attribute-values '{":st": {"S":"New York"}, ":dt": {"S":"2020-10-01"}}' --limit 5 --no-scan-index-forward

scan-index-forward:
  - true: results sorted by ASC sort key
  - false: results sorted by DESC sort key

## Local Secondary Index (LSI)

Allows Strongly Consistent Read, but still rely on the original Hash Key

aws dynamodb create-table --table-name USA_States --attribute-definitions AttributeName=state,AttributeType=S AttributeName=date,AttributeType=S --key-schema AttributeName=state,KeyType=HASH AttributeName=date,KeyType=RANGE --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 --local-secondary-indexes \
'[{"IndexName": "date-index", \
"KeySchema": [{"AttributeName": "date", "KeyType": "HASH"}], \
"Projection": {"ProjectionType": "ALL"}}, \

{"IndexName": "date-state-index", \
"KeySchema": [{"AttributeName": "date", "KeyType": "HASH"}, \
{"AttributeName": "state", "KeyType": "RANGE"}], \
"Projection": {"ProjectionType": "ALL"}}]'

aws dynamodb update-table --table-name USA_States --attribute-definitions AttributeName=date,AttributeType=S --endpoint-url http://localhost:8000 --global-secondary-index-updates '[{"Create": {"IndexName": "date-index", "KeySchema": [{"AttributeName": "date", "KeyType": "HASH"}], "Projection": {"ProjectionType": "ALL"}, "ProvisionedThroughput": {"ReadCapacityUnits": 5, "WriteCapacityUnits": 5}}}]'

## Global Secondary Index (GSI)
https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GSI.html
https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/getting-started-step-6.html

### Note
Using GSI is **NOT consistent** since Strongly Consistent Read is NOT available for GSI. This means that GSI query may not return recently written, up-to-date data (instead returns stale data). In other words, GSI leads to data discrepancy between DynamoDB server and user fetching

### Create Global Secondary Index
(required: IndexName, KeySchema, Projection, ProvisionedThroughput)

aws dynamodb update-table --table-name USA_States --attribute-definitions AttributeName=date,AttributeType=S AttributeName=state,AttributeType=S --endpoint-url http://localhost:8000 --global-secondary-index-updates \
'[{"Create": { \
  "IndexName": "date-state-index", \
  "KeySchema": [ \
    {"AttributeName": "date", "KeyType": "HASH"}, \
    {"AttributeName": "state", "KeyType": "RANGE"}], \
  "Projection": {"ProjectionType": "ALL"}, \
  "ProvisionedThroughput": {"ReadCapacityUnits": 5, "WriteCapacityUnits": 5}}}]'

### Query with Global Secondary Index
aws dynamodb query --table-name USA_States --index-name date-state-index --key-condition-expression "#dt = :dt" --expression-attribute-names '{"#dt": "date"}' --expression-attribute-values '{":dt": {"S": "2020-10-11"}}' --endpoint-url http://localhost:8000


## Local vs Global Secondary Index
https://stackoverflow.com/questions/21381744/difference-between-local-and-global-indexes-in-dynamodb

"Global secondary index — an index with a hash and range key that can be different from those on the table. A global secondary index is considered "global" because queries on the index can span all of the data in a table, across all partitions.

Local secondary index — an index that has the same hash key as the table, but a different range key. A local secondary index is "local" in the sense that every partition of a local secondary index is scoped to a table partition that has the same hash key."

- Storage:
For tables with local secondary indexes, there is a 10 GB size limit per partition key value. A table with local secondary indexes can store any number of items, as long as the total size for any one partition key value does not exceed 10 GB.

- Throughput:
Local Secondary Indexes consume throughput from the table. When you query records via the local index, the operation consumes read capacity units from the table. When you perform a write operation (create, update, delete) in a table that has a local index, there will be two write operations, one for the table another for the index. Both operations will consume write capacity units from the table.

Global Secondary Indexes have their own provisioned throughput, when you query the index the operation will consume read capacity from the index, when you perform a write operation (create, update, delete) in a table that has a global index, there will be two write operations, one for the table another for the index*.

*When defining the provisioned throughput for the Global Secondary Index, make sure you pay special attention to the following requirements:

"In order for a table write to succeed, the provisioned throughput settings for the table and all of its global secondary indexes must have enough write capacity to accommodate the write; otherwise, the write to the table will be throttled."

- Management:
Local Secondary Indexes can only be created when you are creating the table, there is no way to add Local Secondary Index to an existing table, also once you create the index you cannot delete it.

Global Secondary Indexes can be created when you create the table and added to an existing table, deleting an existing Global Secondary Index is also allowed.

- Read Consistency:
Local Secondary Indexes support eventual or strong consistency, whereas, Global Secondary Index only supports eventual consistency.

- Projection:
Local Secondary Indexes allow retrieving attributes that are not projected to the index (although with additional cost: performance and consumed capacity units). With Global Secondary Index you can only retrieve the attributes projected to the index.

Special Consideration about the Uniqueness of the Keys Defined to Secondary Indexes:

In a Local Secondary Index, the range key value DOES NOT need to be unique for a given hash key value, same thing applies to Global Secondary Indexes, the key values (Hash and Range) DO NOT need to be unique.
