/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {
  const round = (rowStart, rowEnd, colStart, colEnd, res) => {
    if (rowStart > rowEnd || colStart > colEnd) return res;

    let cnt = (() => {
      const rowLength = rowEnd - rowStart + 1;
      const colLength = colEnd - colStart + 1;

      if (rowLength === 1) {
        return colLength;
      }

      if (colLength === 1) {
        return rowLength;
      }

      return (rowLength + colLength) * 2 - 4;
    })();

    let row = rowStart;
    let col = colStart;

    while (cnt) {
      cnt -= 1;

      res.push(matrix[row][col]);

      if (colStart !== colEnd) {
        if (row === rowStart && col < colEnd) {
          col += 1;
          continue;
        }

        if (row === rowEnd && col > colStart) {
          col -= 1;
          continue;
        }
      }

      if (rowStart !== rowEnd) {
        if (row < rowEnd && col === colEnd) {
          row += 1;
          continue;
        }

        if (row > rowStart && col === colStart) {
          row -= 1;
          continue;
        }
      }
    }

    return round(rowStart + 1, rowEnd - 1, colStart + 1, colEnd - 1, res);
  };

  return round(0, matrix.length - 1, 0, matrix[0].length - 1, []);
};
