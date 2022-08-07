/**
 * @param {number[][]} mat
 * @return {number[]}
 */
const findDiagonalOrder = (mat) => {
  const result = [];

  const rowLength = mat.length;
  const colLength = mat[0].length;

  const diagonalCnt = rowLength + colLength - 1;

  let i = 0;
  let j = 0;

  for (let nowCnt = 0; nowCnt < diagonalCnt; nowCnt += 1) {
    while (i >= 0 && j >= 0 && i < rowLength && j < colLength) {
      result.push(mat[i][j]);
      if (nowCnt % 2 === 0) {
        i -= 1;
        j += 1;
      } else {
        i += 1;
        j -= 1;
      }
    }

    if (nowCnt % 2 === 0) {
      if (j > colLength - 1) {
        i += 2;
        j = colLength - 1;
      } else {
        i = 0;
      }
    } else {
      if (i > rowLength - 1) {
        i -= 1;
        j += 2;
      } else {
        j = 0;
      }
    }
  }

  return result;
};
