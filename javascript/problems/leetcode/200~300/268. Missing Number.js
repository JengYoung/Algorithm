/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function (nums) {
  const len = nums.length;
  return nums.reduce((acc, cur) => acc - cur, (len * (len + 1)) / 2);
};
