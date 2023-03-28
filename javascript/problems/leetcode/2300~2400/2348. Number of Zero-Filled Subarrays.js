/**
 * @param {number[]} nums
 * @return {number}
 */
const zeroFilledSubarray = (nums) => {
  let cnt = 0;
  let total = 0;

  for (let i = 0; i < nums.length; i += 1) {
    const now = nums[i];

    if (now === 0) {
      cnt += 1;
      total += cnt;
    } else {
      cnt = 0;
    }
  }

  return total;
};

console.log(zeroFilledSubarray([1, 3, 0, 0, 2, 0, 0, 4]));
