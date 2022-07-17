function solution(n) {
  if (n % 2) return 0;

  const arr = new Array(5000).fill(0);
  arr[0] = 1;

  for (let i = 2; i < n + 1; i += 2) {
    const newPatternCases = arr
      .filter((value, idx) => idx <= i - 4 && value)
      .reduce((acc, cur) => acc + cur, 0);

    arr[i] = 3 * arr[i - 2] + 2 * newPatternCases;
  }

  return arr[n] % 1000000007;
}

console.log(solution(6));
