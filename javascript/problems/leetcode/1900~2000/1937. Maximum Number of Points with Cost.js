/**
 * @param {number[][]} points
 * @return {number}
 */
var maxPoints = function (points) {
  const row = points.length;
  const col = points[0].length;
  for (let i = 1; i < row; i += 1) {
    for (let j = 0; j < col; j += 1) {
      let maxValue = 0;
      for (let k = 0; k < col; k += 1) {
        maxValue = Math.max(points[i - 1][k] - Math.abs(j - k), maxValue);
      }
      points[i][j] += maxValue;
    }
  }

  return Math.max(...points[row - 1]);
};
