const maximumUniqueSubarray = (nums) => {
  let result = 0;

  let left = 0;
  let right = 0;
  let total = 0;
  let set = new Set();

  while (left <= right && right !== nums.length) {
    console.log(left, right, total, set);
    const head = nums[left];
    const next = nums[right];
    if (!set.has(next)) {
      right += 1;
      set.add(next);
      total += next;
      result = Math.max(result, total);
    } else {
      console.log(head);
      left += 1;
      set.delete(head);
      total -= head;
    }
  }
  return Math.max(result, total);
};

console.log(maximumUniqueSubarray([5, 2, 1, 2, 5, 2, 1, 2, 5]));
console.log(maximumUniqueSubarray([10000]));
console.log(maximumUniqueSubarray([20, 19, 20, 1, 2, 3, 4, 5]));
