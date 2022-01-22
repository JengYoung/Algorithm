const minimumEffortPath = (grid) => {
  const xLength = grid.length;
  const yLength = grid[0].length;
  const dp = Array.from({ length: xLength }, () =>
    new Array(yLength).fill(Infinity)
  );

  dp[0][0] = grid[0][0];

  const directions = [
    [-1, 0],
    [0, -1],
  ];

  for (let i = 0; i < xLength; i += 1) {
    for (let j = 0; j < yLength; j += 1) {
      const now = grid[i][j];
      for (let k = 0; k < 2; k += 1) {
        const [dx, dy] = directions[k];
        const nx = i + dx;
        const ny = j + dy;
        if (nx >= 0 && ny >= 0 && nx < xLength && ny < yLength) {
          dp[i][j] = Math.min(dp[i][j], dp[nx][ny] + now);
        }
      }
    }
  }

  return dp[xLength - 1][yLength - 1];
};

const grid = [
  [1, 2, 3],
  [4, 5, 6],
];
console.log(minimumEffortPath(grid));
