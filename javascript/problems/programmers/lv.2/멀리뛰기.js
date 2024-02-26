function solution(n) {
  const dp = new Array(2001).fill(0);

  dp.forEach((v, index) => {
    if ([0, 1, 2].some((v) => v === index)) {
      dp[index] = BigInt(index);

      return;
    }

    dp[index] = BigInt(dp[index - 1]) + BigInt(dp[index - 2]);
  });

  return Number(dp[n] % 1234567n);
}
