const findParent = (parent, x) => {
  if (parent[x] === x) return x;
  return findParent(parent, parent[x]);
}

const updateParent = (parent, a, b) => {
  const parentA = findParent(parent, a);
  const parentB = findParent(parent, b);
  if (parentA < parentB) parent[parentB] = parent[parentA];
  else if (parentB < parentA) parent[parentA] = parent[parentB];
}
