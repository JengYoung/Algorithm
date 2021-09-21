const combine = (n, k) => {
  if (n < k) return [];
  if (k === 1) return Array.from({length: n}, (_, idx) => [idx + 1]);
  let result = [];
  for(let i = n; i > 0; i -= 1) {
    combine(i - 1, k - 1)
    .forEach(comb => {
      result.push([i, ...comb])
    })
  }
  return result;
}

(() => {
  const [n, k] = [6, 3];
  console.log(combine(n, k));
})()