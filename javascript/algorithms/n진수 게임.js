const solution = (n, t, m, p) => {
  let answer = "";
  let total = "";
  let i = 0;
  while (true) {
    const num = i.toString(n);
    total += num;
    i += 1;
    if (t * m + (p - 1) < total.length) {
      break;
    }
  }
  for (let i = 0; i < total.length; i += 1) {
    if (answer.length === t) {
      break;
    }
    if (i % m === p - 1) {
      answer += total[i].toUpperCase();
    }
  }
  return answer;
};

const n = 16;
const t = 16;
const m = 2;
const p = 1;
console.log(solution(n, t, m, p));
