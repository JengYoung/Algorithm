const solution = (word) => {
  const target = word.split("");
  const words = ["A","E","I","O","U"];
  const nextIndices = {
    "A": 1,
    "E": 2,
    "I": 3,
    "O": 4,
    "U": 0
  }
  let now = ["A"];
  let cnt = 1;
  while (word !== now.join("")) {
    cnt += 1;
    let lastWord = now[now.length - 1];
    if (now.length < 5) {
      now.push("A")
    } else {
      if (lastWord === "U") {
        while (lastWord === "U") {
          now.pop();
          lastWord = now[now.length - 1];
        }
      }
      now.pop();
      now.push(words[nextIndices[lastWord]])
    }
    if (target.join("") === now.join("")) {
      break;
    }
  }
  return cnt
}

(() => {
  const word = "A";
  console.log(solution(word))
})();

(() => {
  const word = "AAAEO";
  console.log(solution(word))
})();