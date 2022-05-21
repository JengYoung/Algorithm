const countVowelStrings = (n) => {
  const arr = Array.from({ length: n }, () => new Array(5).fill(0));

  for (let i = 0; i < n; i += 1) {
    for (let j = 0; j < 5; j += 1) {
      if (!i) {
        arr[i][j] = 1;
      } else {
        for (let k = 0; k <= j; k += 1) {
          arr[i][j] += arr[i - 1][k];
        }
      }
    }
  }

  return arr[arr.length - 1].reduce((acc, cur) => acc + cur, 0);
};

(() => {
  const n = 1;
  console.log(countVowelStrings(n)); // 5
})();

(() => {
  const n = 2;
  console.log(countVowelStrings(n)); // 15
})();

(() => {
  const n = 33;
  console.log(countVowelStrings(n)); // 66045
})();
