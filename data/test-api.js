const pako = require('pako');
const S3Client = require('../aws/aws-s3-client.js');
const s3Client = new S3Client(process.env.CN_AWS_S3_KEY, process.env.CN_AWS_S3_SECRET);
const s3GetReq = s3Client.getObjectRequest('covidnow/data/usa', 'historical-counties.txt');
s3Client.get(s3GetReq)
  .then(data => {
    // console.log(data);
    // returns the case data right away, no obj key wraps
    const objData = JSON.parse(pako.inflate(data.Body.toString('utf-8'), {to: 'string'}));
    console.log(objData);
  })
  .catch(err => next(err));
