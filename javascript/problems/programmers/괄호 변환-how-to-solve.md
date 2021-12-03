## 풀이 과정
재귀함수적인 사고만 있다면 여유롭게 충분히 풀 수 있는 문제이다.

1. 입력이 빈 문자열이면 리턴한다.
2. 균형잡힌 괄호(왼쪽과 오른쪽 괄호 갯수가 같은)의 개수를 판별하고, 올바른 괄호인지도 판별한다.
3. u와 v를 나눠준다.
4. 이때, 균형이 잡혔다면 v만 재귀적으로 수행해준다.
5. 아니라면, 나머지 문자열(v)의 앞뒤에 괄호를 넣어주고 
6. u의 앞뒤 문자는 제거한 후 나머지 괄호들을 '('면 ')'로, ')'면 '('로 바꿔준다.
7. 재귀를 끝낸 문자를 반환한다.

## 코드
```js
const getMinBalancedBracketInfo = (n) => {
  let left = 0;
  let right = 0;

  let isCorrect = true;

  let i = 0;
  while (left !== right || !i) {
    if (n[i] === "(") left += 1;
    else right += 1;
    if (left < right) isCorrect = false;
    i += 1;
  }

  return [i, isCorrect];
};

const solution = (n) => {
  if (!n.length) return "";
  const [balancedBracketLength, isCorrect] = getMinBalancedBracketInfo(n);
  let [u, v] = [
    n.slice(0, balancedBracketLength),
    n.slice(balancedBracketLength),
  ];

  let result = isCorrect
    ? u + solution(v)
    : "(" +
      solution(v) +
      ")" +
      u
        .slice(1, u.length - 1)
        .split("")
        .map((val) => (val === "(" ? ")" : "("))
        .join("");

  return result;
};
```
