const isArray = a => Array.isArray(a); // a => a && typeof a === "object" && a.constructor === Array, // alt for no ES5
const isObject = o => o && typeof o === 'object' && o.constructor === Object;
const isDict = d => isObject(d) && !isArray(d); // is dictionary

module.exports = {
  isArray, isObject, isDict,
  /*
      Pass on an object of promises
      input: {key1: promise1, key2: promise2, etc...}
      output: {key1: res1, key2: res2, etc...}
  */
  objectPromise: obj => {
    // https://stackoverflow.com/questions/44050414/promise-all-for-objects-in-javascript
    // just use return for prettier syntax
    return Promise.all(
      Object
        .keys(obj)
        .map(key => Promise.resolve(obj[key]).then(val => ({key: key, val: val})))
    ).then(items => {
      let result = {};
      items.forEach(item => result[item.key] = item.val);
      return result;
    });
  },
  /*
      Extend object deep in order of params
      usage: deepExtend(obj1, obj2, obj3)
      output: obj (obj3 overwrites obj2 overwrites obj1)
  */
  deepExtend: (...extend) => {
    let end = undefined;
    for (let val of extend){
      if (isDict(val)){
        // contains dictionary
        if (!isObject(end)) end = {}; // change end to {} if end is not object
        for (let k in val) end[k] = this.deepExtend(end[k], val[k]); // loops through all nested objects
      } else end = val;
    }
    return end;
  },
  /*
      Map object by keys (does not copy obj)
      usage: mapKey(obj, function(val, key){})
  */
  mapKey: (obj, callback = () => {}) => {
    if (!isDict(obj)) return undefined;
    let object = Object.keys(obj);
    if (object.length === 0) return {};
    object.forEach(key => {
      const val = obj[key];
      callback(val, key);
    });
  },
};
