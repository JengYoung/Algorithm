/**
 * @param {number[]} nums
 * @return {boolean}
 */
var checkPossibility = function (nums) {
  let cnt = 0;
  if (nums[1] && nums[0] > nums[1]) {
    cnt += 1;
    nums[0] = nums[1] - 1;
  }

  for (let i = 1; i < nums.length; i += 1) {
    if (nums[i] > nums[i + 1]) {
      if (cnt === 1) return false;
      cnt += 1;

      if (nums[i + 1] < nums[i - 1]) {
        nums[i + 1] = nums[i];
      } else {
        nums[i] = nums[i - 1];
      }
    }
  }

  return true;
};

export default checkPossibility;
