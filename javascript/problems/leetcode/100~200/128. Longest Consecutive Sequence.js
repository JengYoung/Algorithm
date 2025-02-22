/**
 * @param {number[]} nums
 * @return {number}
 */
const longestConsecutive = function (nums) {
  let result = 0;

  const set = new Set(nums);

  set.forEach((value) => {
    if (set.has(value - 1)) {
      return;
    }

    let currentValue = value;
    let cnt = 1;
    while (set.has(currentValue + 1)) {
      cnt += 1;
      currentValue += 1;
    }

    result = Math.max(result, cnt);
  });

  return result;
};
