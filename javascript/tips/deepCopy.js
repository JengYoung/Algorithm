function deepCopy(obj) {
  var clone = {};
  for (var key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      clone[key] = deepCopy(obj[key]);
    } else {
      clone[key] = obj[key];
    }
  }
  return clone;
}

const obj1 = {
  a: 1,
  b: 'string',
  c: {
    name: 'Leon',
    age: '29',
  },
};

// Deep Copy 방법 1. JSON 파싱
/*
    한계점: 깊은 복사가 불가능한 타입들이 꽤 많음. 
    함수(functions), Date 객체, 정규표현식, Infinity 등등의 데이터는 복사되지 X
*/
const obj2 = JSON.parse(JSON.stringify(obj1));

// Deep Copy 방법 2. Lodash - CloneDeep 활용

const original = { a: { b: 2 } };
let copy = _.cloneDeep(original);
copy.a.b = 100;
console.log(original.a.b); //2
