/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function (m, n) {
  if (m === 1 || n === 1) {
    return 1;
  }

  const board = Array.from({ length: m }, () => new Array(n).fill(0));

  for (let i = 0; i < m; i += 1) {
    for (let j = 0; j < n; j += 1) {
      if (i === 0 || j === 0) {
        board[i][j] = 1;
        continue;
      }

      board[i][j] = board[i - 1][j] + board[i][j - 1];
    }
  }

  return board[m - 1][n - 1];
};
