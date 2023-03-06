const solution = (n, k) => {
  return n.toString(k).split('0').filter(isPrime).length;
};

const isPrime = (n) => {
  if (n < 2) return false;

  for (let i = 2; i <= Math.sqrt(n); i += 1) {
    if (n % i === 0) return false;
  }

  return true;
};

{
  const n = 437674;
  const k = 3;

  console.log(solution(n, k)); // 3
}
