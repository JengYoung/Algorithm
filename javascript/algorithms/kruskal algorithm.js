const findParent = (parent, x) => {
  if (parent[x] === x) return x;
  return findParent(parent, parent[x]);
}

const unionParent = (parent, a, b) => {
  const parentA = findParent(parent, a);
  const parentB = findParent(parent, b);
  if (parentA < parentB) parent[parentB] = parent[parentA];
  else if (parentB < parentA) parent[parentA] = parent[parentB];
}
const v = 7
let result = 0;
const parent = Array.from({ length: v + 1 }, (_, i) => i);

const edges = [
  [29, 1, 2],
  [75, 1, 5],
  [35, 2, 3],
  [34, 2, 6],
  [7, 3, 4],
  [23, 4, 6],
  [13, 4, 7],
  [53, 5, 6],
  [25, 6, 7]
]

edges.sort((a, b) => (a[0] - b[0]));
for (let [cost, a, b] of edges) {
  if (findParent(parent, a) !== findParent(parent, b)) {
    unionParent(parent, a, b);
    result += cost;
  }
}