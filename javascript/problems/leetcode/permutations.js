const permute = nums => {
  const result = [];
  if (nums.length === 1) return [nums];

  nums.forEach((head, idx) => {
    console.log("head: ", head)
    permute(nums.filter((_, tailIdx) => tailIdx !== idx))
    .forEach(permutedTail => {
      console.log("여기: ", [head, ...permutedTail]);
      result.push([head, ...permutedTail])
    })
  })

  return result;
}

(() => {
  const nums = [1,2,3,4]
  console.log(permute(nums))
})()