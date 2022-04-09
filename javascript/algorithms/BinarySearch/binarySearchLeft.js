const binarySearchLeftIndex = (nums, start, end, target) => {
  let s = start;
  let e = end;

  let mid = Math.floor((e + s) / 2);

  while (s <= e) {
    const now = nums[mid];

    if (now === target) {
      if (nums[mid - 1] === target) {
        return binarySearchLeftIndex(nums, s, mid - 1, target);
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

export default binarySearchLeftIndex;
