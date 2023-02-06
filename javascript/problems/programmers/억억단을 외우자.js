const solution = (e, starts) => {
  const DP = new Array(e + 1).fill(0);
  const results = new Array(e + 1).fill(1);

  for (let num = 2; num <= e; num += 1) {
    for (let divider = num; divider <= e; divider += num) {
      DP[divider] += 1;
    }
  }

  for (let i = results.length - 1; i >= 0; i -= 1) {
    if (i === results.length - 1) {
      results[i] = i;
      continue;
    }

    const prevMaxIdx = results[i + 1];

    results[i] = DP[i] >= DP[prevMaxIdx] ? i : prevMaxIdx;
  }

  return starts.map((start) => results[start]);
};

{
  const e = 8;
  const start = [1, 3, 7];

  console.log(solution(e, start)); //[6,6,8]
}
