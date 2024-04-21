const getHeadIndex = (arr, left, right) => {
  const mid = Math.floor((left + right) / 2);

  if (mid <= left) {
    return arr[left] > arr[left + 1] ? left + 1 : left;
  }

  if (arr[mid] > arr[mid + 1]) {
    return mid + 1;
  }

  if (arr[mid] > arr[right]) {
    return getHeadIndex(arr, mid + 1, right);
  }

  return getHeadIndex(arr, left, mid);
};

const binarySearch = (arr, target, left, right) => {
  if (left >= right) {
    return arr[left] === target ? left : -1;
  }

  const mid = Math.floor((left + right) / 2);

  if (arr[mid] === target) {
    return mid;
  }

  return arr[mid] > target
    ? binarySearch(arr, target, left, mid - 1)
    : binarySearch(arr, target, mid + 1, right);
};

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  const headIndex = getHeadIndex(nums, 0, nums.length - 1);

  if (target >= nums[headIndex] && target <= nums.at(-1)) {
    return binarySearch(nums, target, headIndex, nums.length - 1);
  }

  return binarySearch(nums, target, 0, headIndex - 1);
};
