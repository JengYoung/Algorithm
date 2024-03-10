const coinChange = (coins, amount) => {
  const DP = Array(amount + 1).fill(-1);

  DP[0] = 0;

  coins.forEach((coin) => {
    for (let i = coin; i <= amount; i++) {
      const prev = DP[i - coin];

      if (prev === -1) {
        continue;
      }

      if (DP[i] === -1 || DP[i] > prev) {
        DP[i] = prev + 1;
      }
    }
  });

  return DP[amount];
};
