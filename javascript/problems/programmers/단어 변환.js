const solution = (begin, target, words) => {
  const q = [];
  const wordLength = begin.length;
  q.push([begin, words, 0]); // 바뀐 횟수
  while (q.length) {
    const [now, words, cnt] = q.shift();
    if (now === target) return cnt;
    for (let i = 0; i < words.length; i += 1) {
      const word = words[i];
      let diffCount = 0;
      for (let j = 0; j < wordLength; j += 1) {
        diffCount += word[j] !== now[j];
      }
      if (diffCount === 1) {
        q.push([word, words.filter((w) => w !== word), cnt + 1]);
      }
    }
  }
  return 0; // 바뀔 수 없음.
};
