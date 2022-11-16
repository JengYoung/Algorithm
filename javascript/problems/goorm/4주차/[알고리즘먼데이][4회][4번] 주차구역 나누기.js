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
  const numberN = Number(n);
  const dp = [];
  const mod = 100000007;

  dp.push(0);
  dp.push(0);
  dp.push(1);

  for (let i = 3; i < numberN + 1; i += 1) {
    dp.push(
      (2 * (i - 1) + 1) * (dp[dp.length - 1] % mod) + (dp[dp.length - 2] % mod)
    );
    dp.shift();
  }

  return dp[dp.length - 1] % mod;
}
