const sortByAsc = (a, b) => a - b;

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  const result = [];

  if (nums.length <= 2) {
    return result;
  }

  nums.sort(sortByAsc);

  let end = nums.length - 1;

  while (end >= 2) {
    let start = 0;
    let middle = end - 1;

    const third = nums[end];

    while (start < middle) {
      const first = nums[start];
      const second = nums[middle];

      const sum = first + second + third;

      if (sum > 0) {
        middle -= 1;
      }

      if (sum < 0) {
        start += 1;
      }

      if (sum === 0) {
        result.push([first, second, third]);

        while (second === nums[middle]) {
          middle -= 1;
        }

        while (first === nums[start]) {
          start += 1;
        }
      }
    }

    while (third === nums[end]) {
      end -= 1;
    }
  }

  return result;
};
