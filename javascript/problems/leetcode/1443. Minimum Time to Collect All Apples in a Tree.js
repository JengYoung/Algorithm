/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {boolean[]} hasApple
 * @return {number}
 */
const minTime = function (n, edges, hasApple) {
  let result = 0;

  const graph = Array.from({ length: n }, () => []);
  edges.forEach(([s, e]) => {
    graph[s].push(e);
    graph[e].push(s);
  });

  const dfs = (node, prev) => {
    let shouldGo = hasApple[node];

    for (const next of graph[node]) {
      if (next !== prev) {
        const childHasApple = dfs(next, node);

        if (childHasApple) {
          shouldGo = true;
          result += 2;
        }
      }
    }

    return shouldGo;
  };

  dfs(0, null);

  return result;
};

const n = 7;
const edges = [
  [0, 1],
  [0, 2],
  [1, 4],
  [1, 5],
  [2, 3],
  [2, 6],
];
const hasApple = [false, false, true, false, true, true, false];

console.log(minTime(n, edges, hasApple));
