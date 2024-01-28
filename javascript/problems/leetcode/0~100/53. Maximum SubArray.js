/**
 * @param {number[]} nums
 * @return {number}
 */
const maxSubArray = (nums) => {
  const dp = new Array(nums.length + 1).fill(0);
  dp[0] = -Infinity;

  nums.forEach((num, index) => {
    dp[index + 1] = Math.max(dp[index] + num, num);
  });

  return Math.max(...dp);
};
