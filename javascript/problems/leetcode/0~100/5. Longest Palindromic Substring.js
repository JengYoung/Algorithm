/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  if (s.length === 1) return s;

  let result = '';

  const getPalindrom = (start, end, res) => {
    if (start < 0 || end >= s.length) return res;

    const head = s[start];
    const tail = s[end];

    return head === tail
      ? getPalindrom(start - 1, end + 1, head + res + tail)
      : res;
  };

  for (let i = 0; i < s.length; i += 1) {
    const oddCase = getPalindrom(i - 1, i + 1, s[i]);
    const evenCase = getPalindrom(i, i + 1, '');

    const maxCase = oddCase.length > evenCase.length ? oddCase : evenCase;

    result = result.length > maxCase.length ? result : maxCase;
  }

  return result;
};
