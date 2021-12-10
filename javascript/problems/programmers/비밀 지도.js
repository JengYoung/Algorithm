const makeMap = (n) => {
  return Array.from({ length: n }, () => new Array(n).fill(' '))
}
const getInsertedZeroNum = (num, n) => {
  const numLength = num.length;
  let result = num;
  if (numLength < n) {
      const diff = n - numLength;
      for (let i = 0; i < diff; i += 1) {
          result = '0' + result;
      }
  }
  return result;
}

function solution(n, arr1, arr2) {
  const secretMap = makeMap(n);
  arr1.forEach((val, idx) => {
      const now = getInsertedZeroNum(val.toString(2), n);
      for (let i = 0; i < n; i += 1) {
          if (now[i] === '1') secretMap[idx][i] = '#'
      }
  });
  arr2.forEach((val, idx) => {
      const now = getInsertedZeroNum(val.toString(2), n);
      for (let i = 0; i < n; i += 1) {
          if (now[i] === '1') secretMap[idx][i] = '#'
      }
  });
  return secretMap.map(val => val.join(''))
}
