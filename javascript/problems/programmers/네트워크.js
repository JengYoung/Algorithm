const findParent = (x, parent) => {
  return parent[x] === x ? x : findParent(parent[x], parent);
};

const updateParent = (a, b, parent) => {
  const parentA = findParent(a, parent);
  const parentB = findParent(b, parent);
  if (parentA < parentB) parent[parentB] = parent[parentA];
  if (parentB < parentA) parent[parentA] = parent[parentB];
};

const solution = (n, computers) => {
  const parent = Array.from({ length: n }, (_, idx) => idx);
  computers.forEach((arr, rowIdx) => {
    arr.forEach((value, colIdx) => {
      if (rowIdx === colIdx) return;
      if (value) updateParent(rowIdx, colIdx, parent);
    });
  });

  return parent.filter((val, idx) => val === idx).length;
};

const n = 3;
const computers = [
  [1, 1, 1],
  [1, 0, 1],
  [1, 1, 0],
];

console.log(solution(n, computers));
