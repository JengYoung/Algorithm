/**
 * @param {number[][]} mat
 * @return {number[]}
 */
const findDiagonalOrder = (mat) => {
  const result = [];
  console.log(mat);
  const rowLength = mat.length;
  const colLength = mat[0].length;

  const diagonalCnt = rowLength + colLength - 1;

  let i = 0;
  let j = 0;

  console.log(diagonalCnt, rowLength, colLength);
  for (let nowCnt = 0; nowCnt < diagonalCnt; nowCnt += 1) {
    console.log(`start - nowCnt: ${nowCnt} / `, i, j);

    while (i >= 0 && j >= 0 && i < rowLength && j < colLength) {
      console.log(`nowCnt: ${nowCnt} / `, i, j);
      result.push(mat[i][j]);
      if (nowCnt % 2 === 0) {
        i -= 1;
        j += 1;
      } else {
        i += 1;
        j -= 1;
      }
    }

    console.log(`mid: / `, i, j);
    if (nowCnt % 2 === 0) {
      if (j > colLength - 1) {
        i += 2;
        j = colLength - 1;
      } else {
        i = i < 0 ? 0 : rowLength - 1;
      }
    } else {
      if (i > rowLength - 1) {
        i -= 1;
        j += 2;
      } else {
        j = j < 0 ? 0 : colLength - 1;
      }
    }
    console.log('result: ', i, j);
  }

  return result;
};

console.log(
  findDiagonalOrder([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ])
);

console.log(
  findDiagonalOrder([
    [1, 2],
    [3, 4],
  ])
);

console.log(findDiagonalOrder([[3], [2]]));
