function solution(number, limit, power) {
  const arr = new Array(number + 1).fill(0);

  for (let i = 1; i <= number; i += 1) {
    for (let j = i; j <= number; j += i) {
      arr[j] += 1;
    }
  }

  return arr.reduce(
    (acc, cur, idx) => (idx ? acc + (cur > limit ? power : cur) : acc),
    0
  );
}

console.log(solution(5, 3, 2));
