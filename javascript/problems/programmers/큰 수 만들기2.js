// 4177252841
const solution = (number, k) => {
  const reversedNumberArr = [...number].reverse();
  const result = [];
  let nextStartIndex = 0;

  while (k !== 0 && reversedNumberArr.length) {
    nextStartIndex += 1;
    const now = reversedNumberArr.pop();
    while (k !== 0 && result.length && result[result.length - 1] < now) {
      result.pop();
      k -= 1;
    }

    result.push(now);
  }

  if (k) {
    for (let i = 0; i < k; i += 1) {
      result.pop();
    }
  }
  
  return result.join('') + number.slice(nextStartIndex);
}

(() => {
  const number = "1924";
  const k = 2;
  console.log(solution(number, k));
})();

(() => {
  const number = "1231234";
  const k = 3;
  console.log(solution(number, k));
})();

(() => {
  const number = "4177252841";
  const k = 4;
  console.log(solution(number, k));
})();

(() => {
  const number = "987654321";
  const k = 4;
  console.log(solution(number, k));
})();