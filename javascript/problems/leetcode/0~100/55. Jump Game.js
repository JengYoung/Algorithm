const canJump = nums => {
  const target = nums.length; // target - 1
  let maxIndex = 0;

  for (let i = 0; i < target; i += 1) {
    if (maxIndex < i) return false; // [0, 1] ->i = 1 maxIndex = 
    const now = i + nums[i]; // 뛸 때마다 갈 수 있는 양 0 + 0
    if (maxIndex < now) {
      maxIndex = now;
    }
    if (maxIndex >= target - 1) return true;
  }
};

(() => {
  const nums = [2,3,1,1,4];
  console.log(canJump(nums))
})();