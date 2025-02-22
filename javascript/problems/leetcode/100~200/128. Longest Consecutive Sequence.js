/**
 * @param {number[]} nums
 * @return {number}
 */
const longestConsecutive = function (nums) {
  const positives = {};
  const negatives = {};

  for (let i = 0; i < nums.length; i += 1) {
    const num = nums[i];
    if (num >= 0) {
      positives[num] = null;
    } else {
      negatives[num * -1] = null;
    }
  }

  const sortedArray = [];
  const sortedNegatives = Object.keys(negatives);
  const sortedPositives = Object.keys(positives);

  while (sortedNegatives.length) {
    sortedArray.push(sortedNegatives.pop() * -1);
  }

  for (let i = 0; i < sortedPositives.length; i += 1) {
    sortedArray.push(sortedPositives[i]);
  }

  let result = 0;

  let count = 0;
  let prev = 0;

  for (let i = 0; i < sortedArray.length; i += 1) {
    const now = sortedArray[i];

    if (!i) {
      result = 1;
      count += 1;
      prev = now;
      continue;
    }

    if (Number(now) === Number(prev) + 1) {
      count += 1;
    } else {
      count = 1;
    }

    result = Math.max(result, count);
    prev = now;
  }

  return result;
};
