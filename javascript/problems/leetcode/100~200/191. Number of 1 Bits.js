/**
 * @param {number} n
 * @return {number}
 */
var hammingWeight = function (n) {
  let cnt = 0;

  while (n > 0) {
    if (n & 1) {
      cnt += 1;
    }

    n >>= 1;
  }

  return cnt;
};
