function solution(n) {
  if (n % 2) return 0;

  const arr = new Array(5000).fill(0);
  arr[0] = 1;

  let newPatternCases = 0;

  for (let i = 2; i < n + 1; i += 2) {
    if (i >= 4) newPatternCases += 2 * arr[i - 4];

    arr[i] = (3 * arr[i - 2] + newPatternCases) % 1000000007;
  }

  return arr[n];
}
console.log(solution(6));
