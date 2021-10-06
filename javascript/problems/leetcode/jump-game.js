
const canJump = nums => {
  const target = nums.length;
  let maxIndex = 0;

  for (let i = 0; i < target; i += 1) {
    if (maxIndex < i) return false;
    const now = i + nums[i];
    if (maxIndex < now) {
      maxIndex = now;
    }
    if (maxIndex >= target - 1) return true;
  }
};

(() => {
  const nums = [0];
  console.log(canJump(nums))
})();