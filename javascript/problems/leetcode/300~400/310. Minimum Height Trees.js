/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[]}
 */
var findMinHeightTrees = function (n, edges) {
  if (!edges.length) {
    return [0];
  }

  const graph = Array.from({ length: n }).map(() => []);

  const result = [];
  const degrees = new Array(n).fill(0); // 위상정렬 짭 -> 차수를 캐싱하는 배열

  edges.forEach(([x, y]) => {
    graph[x].push(y);
    graph[y].push(x);

    degrees[x] += 1;
    degrees[y] += 1;
  });

  const roots = []; // 큐를 돌리기 위한 배열

  degrees.forEach((degree, rootId) => {
    if (degree === 1) {
      roots.push(rootId);
    }
  });

  if (degrees.every((v) => v <= 1)) {
    return roots;
  }

  while (roots.length) {
    const nextRoots = [];

    for (const now of roots) {
      if (degrees[now] === 0) continue;

      degrees[now] -= 1;

      for (let nextRoot of graph[now]) {
        if (degrees[nextRoot] === 0) continue;

        degrees[nextRoot] -= 1;

        if (degrees[nextRoot] === 1) {
          nextRoots.push(nextRoot);
        }
      }
    }

    if (degrees.every((v) => v <= 1)) {
      return nextRoots;
    }

    roots.push(...nextRoots);
  }

  return result;
};
