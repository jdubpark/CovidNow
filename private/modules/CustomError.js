module.exports = class CustomError extends Error{
  constructor(type='', message=''){
    super(message);
    this.type = type;
    this.name = 'CustomError';
  }
};
