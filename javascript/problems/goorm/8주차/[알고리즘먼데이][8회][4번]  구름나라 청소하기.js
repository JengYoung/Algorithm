// Run by Node.js
const readline = require('readline');

(async () => {
  let rl = readline.createInterface({ input: process.stdin });

  const inputs = [];

  rl.on('line', (line) => inputs.push(line)).on('close', () => {
    const [N, K] = inputs[0].split(' ').map(Number);
    const graph = {};

    for (let i = 1; i < N; i += 1) {
      const [a, b] = inputs[i].split(' ').map(Number);

      graph[a] = graph[a] ? [...graph[a], b] : [b];
      graph[b] = graph[b] ? [...graph[b], a] : [a];
    }

    const A = [0, ...(inputs[inputs.length - 1].split(' ').map(Number) ?? [])];

    main(N, K, graph, A);
  });
})();

function main(N, K, G, A) {
  let result = 0;

  const dp = Array.from({ length: K + 1 }, () => new Set());
  dp[0].add(0);

  const DPS = (cur, prev) => {
    for (let i = 0; i < K + 1; i += 1) {
      if (dp[i].has(prev)) {
        dp[i].add(cur);

        const nowCap = i + A[cur];
        if (nowCap <= K) {
          dp[nowCap].add(cur);

          result = Math.max(result, nowCap);
        }
      }
    }

    if (G[cur]) {
      for (const nxt of G[cur]) {
        if (nxt !== prev) {
          DPS(nxt, cur);
        }
      }
    }
  };

  DPS(1, 0);

  console.log(result);
}
