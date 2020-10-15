module.exports = {
  yyyymmdd: dobj => dobj.toISOString().split('T')[0],
  nDaysAgo: ((d, n) => new Date(new Date(d).setDate(d.getDate()-n))),
  oneDayAgo: (d => new Date(new Date(d).setDate(d.getDate()-1))),
  // nDaysAgo_ and oneDayAgo_ mutate the original dobj
  nDaysAgo_: ((d, n) => new Date(d.setDate(d.getDate()-n))),
  oneDayAgo_: (d => new Date(d.setDate(d.getDate()-1))),
  //
  // Execute dynamodb query in loop to get all results
  // since ddb outputs only up to 1mb per query result
  //
  queryExecute: ({params, docClient}) => {
    let items = []; // queryCount = 0;
    const queryLoop = ({params, resolve, reject}) => {
      docClient.query(params, (err, res) => {
        // queryCount += 1;
        if (err) return reject(err);

        if (res.Items) items = items.concat(res.Items);
        if (res.LastEvaluatedKey){
          params.ExclusiveStartKey = res.LastEvaluatedKey;
          // throughput is limited on dynamodb (unless it's on-demand)
          setTimeout(() => {
            queryLoop({params, resolve, reject});
          }, 50);
        } else {
          resolve(items); // , queryCount
        }
      });
    };
    // promise
    return new Promise((resolve, reject) => queryLoop({params, resolve, reject}));
  },
};
