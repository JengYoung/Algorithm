const countSquares = (matrix) => {
  const check = (row, col, len, rowLength, colLength) => {
    for (let i = row; i < row + len; i += 1) {
      if (!(i < rowLength)) return false;

      for (let j = col; j < col + len; j += 1) {
        if (!(j < colLength)) return false;
        if (!matrix[i][j]) return false;
      }
    }

    return true;
  };

  let count = 0;

  for (
    let len = 1;
    len <= Math.min(matrix.length, matrix[0].length);
    len += 1
  ) {
    for (let i = 0; i < matrix.length; i += 1) {
      for (let j = 0; j < matrix[0].length; j += 1) {
        if (check(i, j, len, matrix.length, matrix[0].length)) count += 1;
      }
    }
  }

  return count;
};

// const matrix = [
//   [0, 1, 1, 1],
//   [1, 1, 1, 1],
//   [0, 1, 1, 1],
// ];

const matrix = [
  [1, 1],
  [0, 0],
  [1, 1],
];

console.log(countSquares(matrix));
