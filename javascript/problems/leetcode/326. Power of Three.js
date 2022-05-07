// 재귀로 풀었을 때
var isPowerOfThree = function (n) {
  if (n === 0) return false;
  if (n === 1) return true;

  if (n % 3 !== 0) return false;

  const result = isPowerOfThree(n / 3);

  return result;
};

// 재귀로 풀지 않았을 때
var isPowerOfThree = function (n) {
  const limit = Math.pow(2, 31) - 1;
  let num = 1;

  const powerOfThrees = [1];

  while (num <= limit) {
    num *= 3;
    powerOfThrees.push(num);
  }

  return powerOfThrees.includes(n);
};
