/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
  const result = new Array(nums.length).fill(0);
  const set = new Set();

  let cachedMultiplyAllValue = 1;

  for (const num of nums) {
    if (num === 0 && set.has(0)) {
      return result;
    }

    set.add(num);

    if (num !== 0) {
      cachedMultiplyAllValue *= num;
    }
  }

  nums.forEach((num, index) => {
    if (set.has(0)) {
      result[index] = num === 0 ? cachedMultiplyAllValue : 0;
      return;
    }

    result[index] = cachedMultiplyAllValue / num;
  });

  return result;
};
