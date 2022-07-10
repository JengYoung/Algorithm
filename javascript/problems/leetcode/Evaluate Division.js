const equations = [
  ['a', 'c'],
  ['b', 'e'],
  ['c', 'd'],
  ['e', 'd'],
];
const values = [2.0, 3.0, 0.5, 5.0];
const queries = [['a', 'b']];
const solution = (equations, values, queries) => {
  const names = {};
  let cnt = 0;
  // 현재 name들을 index로 묶어준다.
  equations.forEach(([from, to]) => {
    if (!names.hasOwnProperty(from)) {
      names[from] = cnt;
      cnt += 1;
    }
    if (!names.hasOwnProperty(to)) {
      names[to] = cnt;
      cnt += 1;
    }
  });
  console.log(names);

  const keyLength = Object.keys(names).length;

  const arr = Array.from({ length: keyLength }, () =>
    new Array(keyLength).fill(0)
  );

  equations.forEach(([from, to], idx) => {
    arr[names[from]][names[to]] = values[idx];
    arr[names[to]][names[from]] = 1 / values[idx];
  });
  console.log(arr);

  // 답을 참고했는데 -> k => i => j 순으로 해야 한다.
  for (let i = 0; i < keyLength; i += 1) {
    for (let j = 0; j < keyLength; j += 1) {
      if (i === j) arr[i][j] = 1;
      for (let k = 0; k < keyLength; k += 1) {
        if (arr[j][k]) continue;
        // -> arr[i][j] = arr[i][k] * arr[k][j];
        arr[j][k] = arr[j][i] * arr[i][k];
      }
    }
  }

  // 값 도출
  return queries.map(([from, to]) => {
    if (names[from] === undefined || names[to] === undefined) return -1;
    else return arr[names[from]][names[to]] || -1;
  });
};
console.log(solution(equations, values, queries));
