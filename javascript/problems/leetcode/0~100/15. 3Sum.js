/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  const result = new Set();
  const counts = new Map();

  const check = (key, target) => {
    if (key === target && key === 0) {
      return counts.get(key) >= 3;
    }

    return counts.has(target) && (key !== target || counts.get(key) > 1);
  };

  for (let i = 0; i < nums.length; i += 1) {
    const now = nums[i];
    counts.set(now, (counts.get(now) ?? 0) + 1);
  }

  counts.forEach((value, key) => {
    counts.forEach((value, target) => {
      const sum = key + target;

      if (check(key, target) && check(key, -sum) && check(target, -sum)) {
        result.add(JSON.stringify([key, target, -sum].sort()));
      }
    });
  });

  return [...result].map(JSON.parse);
};
