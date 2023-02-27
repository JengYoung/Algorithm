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

var searchRange = function (nums, target) {
  return [
    binarySearchLeftIndex(nums, 0, nums.length - 1, target),
    binarySearchRightIndex(nums, 0, nums.length - 1, target),
  ];
};

(() => {
  const nums = [5, 7, 7, 8, 8, 10];
  const target = 8;
  console.log(searchRange(nums, target));
})();

(() => {
  const nums = [5, 7, 7, 8, 8, 10];
  const target = 6;
  console.log(searchRange(nums, target));
})();

(() => {
  const nums = [];
  const target = 0;
  console.log(searchRange(nums, target));
})();

(() => {
  const nums = [2, 2];
  const target = 2;
  console.log(searchRange(nums, target));
})();
