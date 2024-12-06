/**
 * @param {string} s
 * @return {number}
 */
var longestPalindrome = function (s) {
  const map = new Map();
  let result = 0;

  for (const char of s) {
    map.set(char, (map.get(char) ?? 0) + 1);
  }

  let isOdd = false;
  map.forEach((value, key) => {
    if (value % 2) {
      isOdd = true;
    }

    result += Math.floor(value / 2) * 2;
  });

  return result + (isOdd ? 1 : 0);
};
