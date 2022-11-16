// Run by Node.js
const readline = require('readline');

(async () => {
  let rl = readline.createInterface({ input: process.stdin });

  for await (const line of rl) {
    console.log(main(line));
    rl.close();
  }

  process.exit();
})();

function main(n) {
  const MOD = 100000007;
  const dp = Array.from({ length: n + 1 }, () => new Array(5).fill(0));

  for (let i = 0; i < 5; i += 1) {
    dp[1][i] = 1;
  }

  for (let i = 2; i < n + 1; i += 1) {
    const d1 = dp[i - 1][0] % MOD;
    const d2 = dp[i - 1][1] % MOD;
    const d3 = dp[i - 1][2] % MOD;
    const d4 = dp[i - 1][3] % MOD;
    const d5 = dp[i - 1][4] % MOD;

    dp[i][0] = d1 + d2 + d3 + d4 + d5;
    dp[i][1] = d1 + d3 + d4;
    dp[i][2] = d1 + d2 + d4 + d5;
    dp[i][3] = d1 + d2 + d3;
    dp[i][4] = d1 + d3;
  }

  return dp[n].reduce((acc, cur) => acc + cur, 0) % MOD;
}
