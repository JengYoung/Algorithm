const square = (n) => (v) => v ** n;
const sortByAsc = (a, b) => a - b;

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function (nums) {
  return nums.map(square(2)).sort(sortByAsc);
};
