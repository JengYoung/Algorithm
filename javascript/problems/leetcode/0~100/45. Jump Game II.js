/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function (nums) {
  const len = nums.length;

  const dp = new Array(len).fill(Infinity);

  dp[0] = 0;

  for (let i = 0; i < len; i += 1) {
    const next = nums[i] + i;

    const end = Math.min(len - 1, next);

    for (let j = i; j <= end; j += 1) {
      dp[j] = Math.min(dp[i] + 1, dp[j]);
    }
  }

  return dp.at(-1);
};

console.log(jump([2, 3, 1, 1, 4]));
