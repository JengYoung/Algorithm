/**
 * @param {number[][]} points
 * @return {number}
 */

const calcDist = (x1, y1, x2, y2) => {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
};

const makeGraph = (points) => {
  const arr = [];

  for (let i = 0; i < points.length; i += 1) {
    const [x1, y1] = points[i];

    for (let j = i + 1; j < points.length; j += 1) {
      const [x2, y2] = points[j];

      arr.push([i, j, calcDist(x1, y1, x2, y2)]);
    }
  }

  return arr;
};

const findParent = (x, parent) => {
  return parent[x] === x ? x : findParent(parent[x], parent);
};

const unionFind = (a, b, parent) => {
  const parentA = findParent(a, parent);
  const parentB = findParent(b, parent);

  if (parentA <= parentB) {
    parent[parentB] = parentA;
  } else {
    parent[parentA] = parentB;
  }
};

const minCostConnectPoints = (points) => {
  let total = 0;
  let cnt = 0;

  const graph = makeGraph(points);
  graph.sort((a, b) => a[2] - b[2]);

  const parent = Array.from({ length: points.length + 1 }, (_, idx) => idx);

  for (let [from, to, cost] of graph) {
    if (findParent(from, parent) !== findParent(to, parent)) {
      unionFind(from, to, parent);
      total += cost;
      cnt += 1;

      if (cnt === points.length) break;
    }
  }

  return total;
};

(() => {
  const points = [
    [0, 0],
    [2, 2],
    [3, 10],
    [5, 2],
    [7, 0],
  ];
  console.log(minCostConnectPoints(points));
})();
