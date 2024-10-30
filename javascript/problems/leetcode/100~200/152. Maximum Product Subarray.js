/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function (nums) {
  if (nums.length === 1) {
    return nums[0];
  }

  const sum = new Array(nums.length).fill(null);
  const reverseSum = new Array(nums.length).fill(null);

  nums.forEach((num, index) => {
    const prevSum = sum[index - 1] ?? 1;

    sum[index] = (prevSum ? prevSum : 1) * num;
  });

  for (let index = nums.length - 1; index > 0; index -= 1) {
    const num = nums[index];
    const lastSum = reverseSum[index] ?? 1;

    reverseSum[index - 1] = (lastSum ? lastSum : 1) * num;
  }

  let result = -Infinity;
  let reverseResult = -Infinity;

  sum.forEach((now) => {
    if (now > result) {
      result = now;
    }
  });

  reverseSum.forEach((now) => {
    if (now > reverseResult) {
      reverseResult = now;
    }
  });

  return Math.max(result, reverseResult);
};
