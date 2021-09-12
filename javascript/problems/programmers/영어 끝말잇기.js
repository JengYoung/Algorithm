/*
  1. 1번부터 번호 순서대로 한 사람씩 차례대로 단어를 말합니다.
  2. 마지막 사람이 단어를 말한 다음에는 다시 1번부터 시작합니다.
  3. 앞사람이 말한 단어의 마지막 문자로 시작하는 단어를 말해야 합니다.
  4. 이전에 등장했던 단어는 사용할 수 없습니다.
  5. 한 글자인 단어는 인정되지 않습니다.
*/


const solution = (n, words) => {
  let personNumber = 0;
  let turn = 0;
  const len = words.length;
  let i = 0;
  let lastWord = ""
  const prevWords = new Map();
  while (i < len) {
    const now = words[i];
    if (!(i % n)) turn += 1;
    personNumber = (personNumber) % n + 1
    if (prevWords.has(now)) {
      return [personNumber, turn]
    }
    if (lastWord) {
      if (lastWord[lastWord.length - 1] !== now[0]) {
        return [personNumber, turn]
      }
    }
    prevWords.set(now, 0);

    lastWord = now;

    i += 1;
  }
  return [0, 0]
}
(() => {
  const n = 3
  const words = [
    "tank", 
    "kick", 
    "know", 
    "wheel", 
    "land", 
    "dream", 
    "mother", 
    "robot", 
    "tank"
  ];
  console.log(solution(n, words))
})();

(() => {
  const n = 2
  const words = ["hello", "one", "even", "never", "now", "world", "draw"]
  console.log(solution(n, words))
})();

(() => {
  const n = 5
  const words = ["hello", "observe", "effect", "take", "either", "recognize", "encourage", "ensure", "establish", "hang", "gather", "refer", "reference", "estimate", "executive"]
  console.log(solution(n, words))
})();