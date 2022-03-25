const letters = {
  2: ['a', 'b', 'c'],
  3: ['d', 'e', 'f'],
  4: ['g', 'h', 'i'],
  5: ['j', 'k', 'l'],
  6: ['m', 'n', 'o'],
  7: ['p', 'q', 'r', 's'],
  8: ['t', 'u', 'v'],
  9: ['w', 'x', 'y', 'z'],
};

const letterCombinations = (digits, result = '', results = []) => {
  if (!digits.length) {
    if (result === '') return [];

    results.push(result);
    return results;
  }

  const now = digits[0];
  digits = digits.slice(1);
  const nowLetters = letters[now];

  for (let i = 0; i < nowLetters.length; i += 1) {
    const nextResult = result + nowLetters[i];
    results = letterCombinations(digits, nextResult, results);
  }

  return results;
};

(() => {
  const digits = '23';
  console.log(letterCombinations(digits));
})();

(() => {
  const digits = '';
  console.log(letterCombinations(digits));
})();
