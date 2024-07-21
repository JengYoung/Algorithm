/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
  const dp = Array.from({ length: nums.length + 1 }, () => []);

  dp[0] = [[]];
  dp[1] = nums.map((num) => [num]);

  for (let i = 1; i < dp.length; i += 1) {
    const nowDp = dp[i];
    const nextDp = dp[i + 1];

    nowDp.forEach((arr) => {
      for (const num of nums) {
        if (arr.at(-1) < num) {
          nextDp.push(arr.concat([num]));
        }
      }
    });
  }

  return dp.flat();
};
