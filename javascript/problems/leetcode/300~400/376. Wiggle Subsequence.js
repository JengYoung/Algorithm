/**
 * @param {number[]} nums
 * @return {number}
 */
var wiggleMaxLength = function (nums) {
  let up = 1;
  let down = 1;

  for (let i = 1; i < nums.length; i += 1) {
    if (nums[i - 1] < nums[i]) {
      up = down + 1;
    }
    if (nums[i] < nums[i - 1]) {
      down = up + 1;
    }
  }

  return Math.max(up, down);
};

export default wiggleMaxLength;
