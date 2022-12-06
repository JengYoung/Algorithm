function solution(n, money) {
  const MOD = 1000000007;

  const MONEY_NUM = money.length;
  const DP_NUM = n + 1;

  const dp = new Array(n + 1).fill(0);

  dp[0] = 1;

  for (let i = 0; i < MONEY_NUM; i += 1) {
    const m = money[i];

    for (let idx = 0; idx < DP_NUM; idx += 1) {
      const diff = idx - m;

      if (diff >= 0) {
        dp[idx] += dp[diff] % MOD;
      }
    }
  }

  return dp[n] % MOD;
}

console.log(solution(5, [1, 2, 5]));
