/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 1 2 3 4 5
 1 2 3 5 4
 1 2 4 3 5
 1 2 4 5 3
 1 2 5 3 4
 1 2 5 4 3
 1 3 2 4 5
 */
const swap = (arr, a, b) => {
  [arr[a], arr[b]] = [arr[b], arr[a]];
};

var nextPermutation = function (nums) {
  let isLast = true;

  let targetIndex = -1;
  let targetNumber = null;

  // 현재 스왑을 해야 되는지를 판별
  for (let i = nums.length - 1; i >= 1; i -= 1) {
    const now = nums[i];
    const target = nums[i - 1];

    if (now > target) {
      targetIndex = i - 1;
      targetNumber = target;
      isLast = false;

      break;
    }
  }

  // 만약 다 돌았다면 그냥 거꾸로 해줘야 함.
  if (isLast) {
    for (let i = 0; i < Math.floor(nums.length / 2); i += 1) {
      swap(nums, i, nums.length - 1 - i);
    }

    return nums;
  }

  let swapTargetIndex = null;

  // 스왑할 후보 숫자를 찾음.
  for (let i = targetIndex + 1; i < nums.length; i += 1) {
    if (
      nums[i] > targetNumber &&
      (swapTargetIndex === null || nums[i] < nums[swapTargetIndex])
    ) {
      swapTargetIndex = i;
    }
  }

  // 스왑할 후보 숫자 스왑
  swap(nums, targetIndex, swapTargetIndex);

  // 정렬
  for (let i = nums.length - 1; i >= 0; i -= 1) {
    for (let j = targetIndex + 1; j < nums.length - 1; j += 1) {
      const now = nums[j];
      const next = nums[j + 1];

      if (now > next) {
        swap(nums, j, j + 1);
      }
    }
  }

  return nums;
};
