const findParent = (x, parent) => {
  return parent[x] === x ? x : (parent[x] = findParent(parent[x], parent));
};

/**
 * @return: number;
 * 병합당한 부모 노드의 값을 반환합니다.
 */
const unionParent = (a, b, parent) => {
  const parentA = findParent(a, parent);
  const parentB = findParent(b, parent);

  if (parentA < parentB) {
    parent[parentB] = parentA;
    parent[b] = parentA;

    return parentB;
  } else if (parentA > parentB) {
    parent[parentA] = parentB;
    parent[a] = parentB;

    return parentA;
  }
};

const findCircleNum = (isConnected) => {
  const rowLength = isConnected.length;
  const colLength = isConnected[0].length;

  const parent = Array.from({ length: isConnected.length }, (_, idx) => idx);

  const set = new Set(parent);

  for (let i = 0; i < rowLength; i += 1) {
    for (let j = i; j < colLength; j += 1) {
      if (!isConnected[i][j] || i === j) continue;

      const loser = unionParent(i, j, parent);
      set.delete(loser);
    }
  }

  return set.size;
};

const isConnected = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1],
];

console.log(findCircleNum(isConnected));
