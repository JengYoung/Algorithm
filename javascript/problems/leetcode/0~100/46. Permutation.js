const permutation = (nums, res = []) => {
  if (!nums.length) {
    return res;
  }

  const result = [];

  for (const num of nums) {
    const nextNums = nums.filter((n) => n !== num);

    const nextRes = res.length ? res.map((arr) => arr.concat([num])) : [[num]];

    result.push(...permutation(nextNums, nextRes));
  }

  return result;
};

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const permute = function (nums) {
  return permutation(nums);
};
