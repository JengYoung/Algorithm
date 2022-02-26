const check = (stack) => {
  const stackLength = stack.length;
  const CHECK_VALUE = "011";
  return (
    stackLength >= 3 &&
    stack[stackLength - 3] + stack[stackLength - 2] + stack[stackLength - 1] ===
      CHECK_VALUE
  );
};

function solution(s) {
  var answer = [];
  s.forEach((num) => {
    let cnt = 0;
    let now = num.split("");
    const stack = [];

    for (let i = 0; i < num.length; i += 1) {
      stack.push(now.pop());
      if (check(stack)) {
        for (let i = 0; i < 3; i += 1) {
          stack.pop();
        }
        cnt += 1;
      }
    }

    embedStrings = "";
    for (let i = 0; i < cnt; i += 1) {
      embedStrings += "110";
    }

    now = [...stack].reverse();

    let embedIndex = -1;
    for (let i = now.length; i >= 0; i -= 1) {
      if (now[i] === "0") {
        embedIndex = i;
        break;
      }
    }

    const nowStr = now.join("");

    const result =
      embedIndex === -1
        ? embedStrings + nowStr
        : nowStr.slice(0, embedIndex + 1) +
          embedStrings +
          nowStr.slice(embedIndex + 1);

    answer.push(result);
  });

  return answer;
}

(() => {
  const s = ["1110", "100111100", "0111111010"];
  console.log(solution(s));
})();
