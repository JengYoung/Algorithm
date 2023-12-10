const dict = (arr2) => (arr) => {
  return arr.reduce((acc, cur, idx) => ({ ...acc, [cur]: arr2[idx] }), {});
};

const pipe =
  (...arg) =>
  (val) =>
    arg.reduce((v, fn) => fn(v), val);

const getSum = (dict) => (arr) => {
  return arr.reduce((acc, cur) => acc + (dict[cur] ?? 0), 0);
};

function solution(name, yearning, photo) {
  const map = pipe(dict(yearning))(name);

  return photo.map(pipe(getSum(map)));
}

console.log(
  solution(
    ['may', 'kein', 'kain', 'radi'],
    [5, 10, 1, 3],
    [
      ['may', 'kein', 'kain', 'radi'],
      ['may', 'kein', 'brin', 'deny'],
      ['kon', 'kain', 'may', 'coni'],
    ]
  )
);
