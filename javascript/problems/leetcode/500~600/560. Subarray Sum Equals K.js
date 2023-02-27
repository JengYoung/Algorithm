const subarraySum = function (nums, k) {
  let result = 0;
  const map = new Map();
  map.set(0, 1);
  nums.reduce((acc, cur) => {
    const now = acc + cur;
    const checkNum = now - k;
    if (map.has(checkNum)) {
      result += map.get(checkNum);
    }
    map.set(now, (map.get(now) ?? 0) + 1);
    return now;
  }, 0);
  return result;
};

const nums = [1];
const k = 0;
console.log(subarraySum(nums, k));
