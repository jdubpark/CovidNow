module.exports = class CustomError extends Error{
  constructor(type='', message=''){
    super(message);
    this.type = type;
    this.name = 'CustomError';
  }

  static err404(req){
    return {code: 404, error: 'page-not-found', endpoint: req.path};
  }

  static err422(req){
    return {code: 404, error: 'unprocessable-entity', endpoint: req.path};
  }
};
