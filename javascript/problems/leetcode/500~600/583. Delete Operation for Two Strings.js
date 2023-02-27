/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */

const minDistance = (word1, word2) => {
  const word1Length = word1.length;
  const word2Length = word2.length;

  const arr = Array.from({ length: word1.length + 1 }, () =>
    new Array(word2.length + 1).fill(0)
  );

  for (let i = 1; i <= word1.length; i += 1) {
    for (let j = 1; j <= word2.length; j += 1) {
      const now1 = word1[i - 1];
      const now2 = word2[j - 1];

      if (now1 === now2) {
        arr[i][j] = Math.max(
          arr[i - 1][j - 1] + 1,
          Math.max(arr[i - 1][j], arr[i][j - 1])
        );
      } else {
        arr[i][j] = Math.max(arr[i - 1][j], arr[i][j - 1]);
      }
      // console.log(now1, now2, arr);
    }
  }
  return word1Length + word2Length - 2 * arr[word1.length][word2.length];
};

console.log(minDistance('sea', 'eat')); // 2
console.log(minDistance('leetcode', 'etco')); // 4
console.log(minDistance('test', 'tooth'));
// console.log(minDistance('a', 'a'));
