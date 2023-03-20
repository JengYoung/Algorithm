function solution(scores) {
  const [target, ...others] = scores;
  if (others.some(([a, b]) => a > target[0] && b > target[1])) return -1;

  scores.sort((a, b) => b[0] - a[0] || a[1] - b[1]);

  const sums = [];

  const max = {
    colleague: 0,
  };

  scores.forEach(([a, b]) => {
    if (b < max.colleague) return;

    max.colleague = b;

    sums.push(a + b);
  });

  const result = sums.sort((a, b) => b - a);

  return result.indexOf(target[0] + target[1]) + 1;
}

console.log(
  solution([
    [2, 2],
    [1, 4],
    [3, 2],
    [3, 2],
    [2, 1],
  ])
);
