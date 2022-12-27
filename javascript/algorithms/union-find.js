const findParent = (parent, x) => {
  if (parent[x] === x) return x;
  return parent[x] === x ? x : (parent[x] = findParent(parent, parent[x]));
};

const updateParent = (parent, a, b) => {
  const parentA = findParent(parent, a);
  const parentB = findParent(parent, b);

  if (parentA < parentB) parent[parentB] = parent[parentA];
  if (parentB < parentA) parent[parentA] = parent[parentB];
};
