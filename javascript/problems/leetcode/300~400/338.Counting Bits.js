/**
 * @param {number} n
 * @return {number[]}
 */
var countBits = function (n) {
  const arr = new Array(n + 1).fill(0);

  arr.forEach((v, idx) => {
    arr[idx] = arr[idx >> 1] + (idx & 1);
  });

  return arr;
};
