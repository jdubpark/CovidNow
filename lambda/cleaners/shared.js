module.exports = class Shared{
  static attach(category){
    return data => this._processData(data, category).bind(this);
  }
};
