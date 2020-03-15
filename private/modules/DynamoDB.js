module.exports = class DynamoDB{
  constructor(conf = {}, AWS){
    const opts = Object.assign({
      // shallow
      tableName: 'TempCoreData',
    }, conf);

    this.AWS = AWS;
    this.docClient = new AWS.DynamoDB.DocumentClient();
    this.tableName = opts.tableName;

    // this.createTable();
  }

  createTable(){
    const params = require('../../config/tables/tempcoredata.json');
    const ddb = new AWS.DynamoDB();
    ddb.createTable(params, (err, data) => {
      if (err) console.error('Unable to create table. Error JSON:', JSON.stringify(err, null, 2));
      else console.log('Created table. Table description JSON:', JSON.stringify(data, null, 2));
    });
  }

  add(toAdd){
    Object.keys(toAdd).forEach(name => {
      const data = toAdd[name];
      const params = {
        TableName: this.tableName,
        Item: {
          'type': name,
          // storing JSON as list/map vs. string
          // https://stackoverflow.com/questions/45429490/storing-json-as-string-in-dynamodb-vs-list-map-types
          'data': data, // JSON.stringify(data)
          'ts': Date.now(),
        },
      };

      this.docClient.put(params, (err, res) => {
        if (err) console.error(JSON.stringify(err, null, 2));
        else console.log('PutItem succeeded');
      });
    });
  }

  update(data2upd){
    Object.keys(data2upd).forEach(name => {
      const data = data2upd[name];
      const params = {
        TableName: this.tableName,
        Key: {
          'type': name,
        },
        UpdateExpression: 'SET #dt = :dt, ts = :ts',
        ExpressionAttributeNames: {
          '#dt': 'data',
        },
        ExpressionAttributeValues: {
          ':dt': data,
          ':ts': Date.now(),
        },
      };

      this.docClient.update(params, (err, res) => {
        if (err) console.error(JSON.stringify(err, null, 2));
        else console.log('UpdateItem succeeded');
      });
    });
  }

  search(type){
    const params = {
      TableName: this.tableName,
      KeyConditionExpression: '#ty = :t',
      ExpressionAttributeNames: {
        // get around reserved keywords
        // https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/ReservedWords.html
        '#ty': 'type',
      },
      ExpressionAttributeValues: {
        ':t': type,
      },
    };

    return new Promise((resolve, reject) => {
      this.docClient.query(params, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  scan(){
    const params = {
      TableName: this.tableName,
      // ProjectionExpression: 'id, #ty, #da, ts',
      // FilterExpression: '#ty = :t',
      // ExpressionAttributeNames: {
      //   // get around reserved keywords
      //   // https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/ReservedWords.html
      //   '#ty': 'type',
      //   '#da': 'data',
      // },
      // ExpressionAttributeValues: {
      //   ':t': 'usa',
      // },
    };
    return new Promise((resolve, reject) => {
      this.docClient.scan(params, (err, res) => {
        if (err) reject(err);
        else resolve(res);
        // continue scanning if we have more data, because
        // scan can retrieve a maximum of 1MB of data
        // if (typeof res.LastEvaluatedKey != 'undefined'){
        //   console.log('Scanning for more...');
        //   params.ExclusiveStartKey = res.LastEvaluatedKey;
        //   docClient.scan(params, onScan);
        // }
      });
    });
  }

  deleteByKey(keys){
    keys.forEach(key => {
      const parms = {
        TableName: 'TempCoreData',
        Key: {type: key},
        ReturnValues: 'NONE', // optional (NONE | ALL_OLD)
        ReturnConsumedCapacity: 'NONE', // optional (NONE | TOTAL | INDEXES)
        ReturnItemCollectionMetrics: 'NONE', // optional (NONE | SIZE)
      };
      this.docClient.delete(parms, function(err, res){
        if (err) console.log(err); // an error occurred
        else console.log(res); // successful response
      });
    });
  }

  deleteItems(items){
    // items: {Items} = data
    const buildKey = obj => ({'type': obj['type']}); // hash key, range key
    items.forEach((val, key) => {
      const parms = {
        TableName: 'TempCoreData',
        Key: buildKey(val),
        ReturnValues: 'NONE', // optional (NONE | ALL_OLD)
        ReturnConsumedCapacity: 'NONE', // optional (NONE | TOTAL | INDEXES)
        ReturnItemCollectionMetrics: 'NONE', // optional (NONE | SIZE)
      };
      this.docClient.delete(parms, function(err, res){
        if (err) console.log(err); // an error occurred
        else console.log(res); // successful response
      });
    });
  }
};
