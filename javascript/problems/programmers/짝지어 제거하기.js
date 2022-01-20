function solution(s) {
  var answer = 0;
  let sArr = [...s];

  while (sArr.length) {
    let nextS = [];
    for (let i = 0; i < sArr.length; i += 1) {
      const now = s[i];
      if (i && nextS[nextS.length - 1] === now) {
        nextS.pop();
      } else {
        nextS.push(now);
      }
    }
    if (sArr.length === nextS.length) return 0;
    sArr = nextS;
  }
  answer = 1;
  return answer;
}
