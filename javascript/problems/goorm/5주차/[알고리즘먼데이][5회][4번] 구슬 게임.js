// Run by Node.js
const readline = require('readline');

(async () => {
  let rl = readline.createInterface({ input: process.stdin });

  const inputs = [];
  rl.on('line', (line) => inputs.push(line)).on('close', () => {
    main(inputs);
    process.exit();
  });
})();

const permute = (nums) => {
  const result = [];
  if (nums.length === 1) return [nums]; // Run by Node.js
  const readline = require('readline');

  (async () => {
    let rl = readline.createInterface({ input: process.stdin });
    const inputs = [];

    rl.on('line', (line) => inputs.push(line.trim())).on('close', () => {
      main(inputs);
      process.exit();
    });
  })();

  function main(p) {
    let result = 0;

    const [N, M, K] = p[0].split(' ').map(Number);

    const dp = Array.from({ length: K + 1 }, () =>
      new Array(N + M + 1).fill(0)
    );
    const MOD = 100000007;

    // dp[현재 경기 수][내 구슬 수]
    dp[0][N] = 1;

    const check = (now) => {
      return now >= 0 && now < N + M + 1;
    };

    for (let i = 1; i < K + 1; i += 1) {
      for (let j = 0; j < N + M + 1; j += 1) {
        const beforeResult = dp[i - 1][j] % MOD;

        if (j !== 0 && check(j + 1))
          dp[i][j + 1] = (dp[i][j + 1] + beforeResult) % MOD;
        if (j !== N + M && check(j - 1))
          dp[i][j - 1] = (dp[i][j - 1] + beforeResult) % MOD;

        dp[i][j] = (dp[i][j] + beforeResult) % MOD;
      }
    }

    console.log((dp[K][0] + dp[K][M + N]) % MOD);
  }

  nums.forEach((head, idx) => {
    permute(nums.filter((_, tailIdx) => tailIdx !== idx)).forEach(
      (permutedTail) => {
        result.push([head, ...permutedTail]);
      }
    );
  });

  return result;
};

function main(p) {
  let result = Infinity;

  const N = p[0];
  const numbers = p[1].split(' ');

  const permutations = permute(numbers);

  permutations.forEach((arr) => {
    let res = '';
    arr.forEach(
      (num) =>
        (res += num[0] === res[res.length - 1] ? num[num.length - 1] : num)
    );
    result = Math.min(+res, +result);
  });

  console.log(result);
}
