/**
 * 1. 결과는 인덱스로 구하면 된다.
 * 2. 반복문을 돌면서, 이전의 값과 다른 경우 / 이전의 단어를 말한 경우 / 한 글자로 말한 경우를 찾으면 1번을 통해 연산한다.
 * 3. 결과를 반환한다.
 */
const solution = (n, words) => {
  const cache = new Set();

  for (let i = 0; i < words.length; i += 1) {
    const word = words[i];
    const prev = words[i - 1] ?? words[i][0];

    if (
      cache.has(word) ||
      word.length <= 1 ||
      prev[prev.length - 1] !== word[0]
    ) {
      return [(i % n) + 1, Math.floor(i / n) + 1];
    }

    cache.add(word);
  }

  return [0, 0];
};

(() => {
  const n = 3;
  const words = [
    'tank',
    'kick',
    'know',
    'wheel',
    'land',
    'dream',
    'mother',
    'robot',
    'tank',
  ];
  console.log(solution(n, words));
})(); // [3, 3]

(() => {
  const n = 2;
  const words = ['hello', 'one', 'even', 'never', 'now', 'world', 'draw'];
  console.log(solution(n, words));
})(); // [1, 3]

(() => {
  const n = 5;
  const words = [
    'hello',
    'observe',
    'effect',
    'take',
    'either',
    'recognize',
    'encourage',
    'ensure',
    'establish',
    'hang',
    'gather',
    'refer',
    'reference',
    'estimate',
    'executive',
  ];
  console.log(solution(n, words)); // [0, 0]
})();
