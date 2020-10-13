function NotImplementedError(msg){
  this.name = 'NotImplementedError';
  this.message = (msg || '');
}
NotImplementedError.prototype = Error.prototype;

module.exports = class TPDWrapper{
  static get urls(){
    throw new NotImplementedError();
  }
};
