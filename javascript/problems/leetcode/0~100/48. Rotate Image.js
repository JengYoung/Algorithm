/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function (matrix) {
  const copiedMatrix = JSON.parse(JSON.stringify(matrix));
  const matrixLength = matrix.length;

  for (let i = 0; i < matrixLength; i += 1) {
    for (let j = 0; j < matrixLength; j += 1) {
      const row = matrixLength - 1 - j;
      const col = i;

      matrix[i][j] = copiedMatrix[row][col];
    }
  }
};

console.log(
  rotate([
    [5, 1, 9, 11],
    [2, 4, 8, 10],
    [13, 3, 6, 7],
    [15, 14, 12, 16],
  ])
);
