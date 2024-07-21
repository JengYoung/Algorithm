/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  if (s.length === 1) return s;

  let result = {
    start: 0,
    length: 0,
  };

  const getPalindrom = (start, end) => {
    if (s[start] !== s[end]) return 0;

    while (true) {
      start -= 1;
      end += 1;

      if (start < 0 || end >= s.length || s[start] !== s[end]) {
        start += 1;
        end -= 1;
        break;
      }
    }

    return end - start + 1;
  };

  for (let i = 0; i < s.length; i += 1) {
    const oddCase = getPalindrom(i, i);
    const evenCase = getPalindrom(i, i + 1);

    const maxCase = oddCase > evenCase ? oddCase : evenCase;

    result =
      result.length > maxCase
        ? result
        : {
            start: i - Math.floor((maxCase - 1) / 2),
            length: maxCase,
          };
  }

  return s.substring(result.start, result.start + result.length);
};
