/**
 * 1. 결국 핵심은 조합 문제.
 * [a,b,c,d] => [a, b] [a, c] [a, d] [b, c] [b, d] [c, d]
 */
const comb = (arr, count) => {
  if (count === 1) return arr.map((value) => [value]);

  const combinations = [];

  arr.forEach((value, index) => {
    const nextArr = arr.filter((_, nextIndex) => index < nextIndex);

    const result = comb(nextArr, count - 1).map((res) => [value, ...res]);

    combinations.push(...result);
  });

  return combinations;
};
