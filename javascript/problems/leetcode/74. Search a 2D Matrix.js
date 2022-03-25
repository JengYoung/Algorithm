/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
const searchMatrix = (matrix, target) => {
  return matrix.flat().indexOf(target) !== -1;
};

(() => {
  const matrix = [
    [1, 3, 5, 7],
    [10, 11, 16, 20],
    [23, 30, 34, 60],
  ];
  const target = 3;

  console.log(searchMatrix(matrix, target));
})();

(() => {
  const matrix = [
    [1, 3, 5, 7],
    [10, 11, 16, 20],
    [23, 30, 34, 60],
  ];
  const target = 13;

  console.log(searchMatrix(matrix, target));
})();
