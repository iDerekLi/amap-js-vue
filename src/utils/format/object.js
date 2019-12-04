/**
 * deepMerge
 * @param target  {Object|Array}  merge target
 * @param objN    {Object|Array}  obj1, obj2, obj3...
 * @returns target
 */
/*
// example
var obj = {};
var obj1 = {
  str: "hello",
  o: { a: 2 },
  arr: [0],
  arr2: [{ a: 1 }]
};
var obj2 = {
  o: { a: 1, b: 2 },
  arr: [1, 2],
  arr2: [{ a: 1, b: 2 }],
  varUndefined: undefined,
  varNull: null,
  varNaN: NaN
};
console.log(deepMerge(obj, obj1, obj2));
*/
export function merge(target, ...objN) {
  function assignItem(val, key) {
    if (typeof target[key] === 'object' && typeof val === 'object') {
      target[key] = merge(target[key], val);
    } else if (typeof val === 'object' && val !== null) {
      let _target = Object.prototype.toString.call(val) === '[object Array]' ? [] : {};
      target[key] = merge(_target, val);
    } else {
      target[key] = val;
    }
  }

  for (let i = 0, l = objN.length; i < l; i++) {
    for (let key in objN[i]) {
      assignItem(objN[i][key], key);
    }
  }
  return target;
}
