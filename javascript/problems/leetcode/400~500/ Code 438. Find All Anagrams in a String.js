/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function (s, p) {
  const getCharacterCounts = (p) => {
    const counts = new Map();
    [...p].forEach((char) => {
      counts.set(char, (counts.get(char) ?? 0) + 1);
    });

    return counts;
  };

  const result = [];

  const pSize = p.length;
  const sSize = s.length;

  const slidingWindowCount = sSize - pSize;

  const pCounts = getCharacterCounts(p);

  const nowCounts = getCharacterCounts(s.slice(0, pSize));

  for (let i = 0; i <= slidingWindowCount; i += 1) {
    if (i > 0) {
      const prev = s[i - 1];
      const next = s[i + pSize - 1];

      const updateTarget = nowCounts.get(prev);

      if (updateTarget === 1) {
        nowCounts.delete(prev);
      } else {
        nowCounts.set(prev, updateTarget - 1);
      }

      nowCounts.set(next, (nowCounts.get(next) ?? 0) + 1);
    }

    let flag = true;
    nowCounts.forEach((_, key) => {
      if (pCounts.get(key) !== nowCounts.get(key)) {
        flag = false;
      }
    });

    if (flag) {
      result.push(i);
    }
  }

  return result;
};
