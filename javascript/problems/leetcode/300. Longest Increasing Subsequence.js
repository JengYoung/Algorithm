const binarySearchLeftIndex = (nums, start, end, target) => {
  let mid = Math.floor((start + end) / 2);

  const now = nums[mid];

  if (start > end) return start;

  if (target <= now) {
    if (target === now) return mid;
    return binarySearchLeftIndex(nums, start, mid - 1, target);
  } else {
    return binarySearchLeftIndex(nums, mid + 1, end, target);
  }
};

const lengthOfLIS = (nums) => {
  const numsLength = nums.length;

  const dp = [];

  for (let i = 0; i < numsLength; i += 1) {
    const now = nums[i];

    if (!dp.length || now > dp[dp.length - 1]) {
      dp.push(now);
    } else {
      const nowIndex = binarySearchLeftIndex(dp, 0, dp.length - 1, now);
      dp[nowIndex] = now;
    }
  }

  return dp.length;
};

(() => {
  const nums = [10, 9, 2, 5, 3, 7, 101, 18];
  console.log(lengthOfLIS(nums));
})();

(() => {
  const nums = [3, 5, 6, 2, 5, 4, 19, 5, 6, 7, 12];
  console.log(lengthOfLIS(nums));
})();
