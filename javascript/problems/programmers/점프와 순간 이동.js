const solution = (n, res = 0) =>
  n === 1 ? res + 1 : solution(parseInt(n / 2), res + (n % 2));
