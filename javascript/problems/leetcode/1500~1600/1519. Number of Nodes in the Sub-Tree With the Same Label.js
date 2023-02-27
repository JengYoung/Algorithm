/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {string} labels
 * @return {number[]}
 * @see: https://leetcode.com/problems/number-of-nodes-in-the-sub-tree-with-the-same-label/
 */
const countSubTrees = (n, edges, labels) => {
  const result = new Array(n).fill(0);
  const visited = new Array(n).fill(false);

  const graph = Array.from({ length: n }, () => []);

  edges.forEach(([from, to]) => {
    graph[from].push(to);
    graph[to].push(from);
  });

  const dfs = (root, res = new Map()) => {
    visited[root] = true;
    const rootChildren = graph[root];

    const label = labels[root];
    res.set(labels[root], (res.get(labels[root]) ?? 0) + 1);

    if (!rootChildren.length) {
      result[root] = 1;
      return res;
    }

    for (let i = 0; i < rootChildren.length; i += 1) {
      const nowNode = rootChildren[i];
      if (visited[nowNode]) continue;

      dfs(nowNode).forEach((val, key) => {
        res.set(key, (res.get(key) ?? 0) + val);
      });
    }

    result[root] = res.get(label);
    return res;
  };

  dfs(0);

  return result;
};

{
  const n = 7;
  const edges = [
    [0, 1],
    [0, 2],
    [1, 4],
    [1, 5],
    [2, 3],
    [2, 6],
  ];
  const labels = 'abaedcd';

  console.log(countSubTrees(n, edges, labels));
}

{
  const n = 4;
  const edges = [
    [0, 2],
    [0, 3],
    [1, 2],
  ];
  const labels = 'aeed';

  console.log(countSubTrees(n, edges, labels));
}
