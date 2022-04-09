const binarySearchRightIndex = (nums, start, end, target) => {
  let s = start;
  let e = end;

  let mid = Math.floor((e + s) / 2);
  console.log(s, e, mid, target, nums[mid]);

  while (s <= e) {
    const now = nums[mid];

    if (now === target) {
      if (nums[mid + 1] === target) {
        return binarySearchRightIndex(nums, mid + 1, e, target);
      }

      return mid;
    }

    if (now < target) {
      s = mid + 1;
      mid = Math.floor((e + s) / 2);
    }

    if (now > target) {
      e = mid - 1;
      mid = Math.floor((e + s) / 2);
    }
  }

  return -1;
};

export default binarySearchRightIndex;
