const AWS = require('aws-sdk');

module.exports = class S3Client{
  constructor(accessKeyId, secretAccessKey, region='us-east-2'){
    AWS.config.update({
      accessKeyId,
      secretAccessKey,
      region: region,
    });
    this.client = new AWS.S3();
  }

  async put(params){
    return new Promise((resolve, reject) => {
      this.client.putObject(params, (err, data) => {
        return err ? reject(err) : resolve(data);
      });
    });
  }

  async get(params){
    return await this.client.getObject(params).promise();
    // return new Promise((resolve, reject) => {
    //   this.client.getObject(params, (err, data) => {
    //     return err ? reject(err) : resolve(data);
    //   });
    // });
  }

  createPutJsonRequest(location, filename, contents){
    const params = {
      Bucket: location,
      Key: filename,
      Body: contents,
      ContentType: 'application/json; charset=utf-8',
      // ACL: 'public-read',
      // CacheControl: 'max-age=60',
    };
    return params;
  }

  getObjectRequest(location, filename){
    const params = {
      Bucket: location,
      Key: filename,
    };
    return params;
  }
};
