const permute = nums => {
  const result = [];
  if (nums.length === 1) return [nums];
  nums.forEach((head, idx) => {
    permute(nums.filter((_, tailIdx) => tailIdx !== idx))
    .forEach(permutedTail => {
      result.push([head, ...permutedTail])
    })
  })
  return result;
}

(() => {
  const nums = [1,2,3]
  console.log(permute(nums))
})()