/* 
  크게 바텀-업, 탑-다운 방식이 있을 거 같다.
  나는 최근에 연습을 하지 않은 재귀로 풀 것이다.

  핵심은 결국, 몇 개를 기억하고 있느냐. 
  따라서 변수로 저장을 해주는 로직을 구현한다.
*/

const getUpdatedResult = (result, prevNumsLength, prev) => {
  return `${result}${prevNumsLength}${prev}`;
};
const isLastIndex = (i, length) => i === length - 1;

const countAndSay = (n) => {
  if (n === 1) return "1";

  let result = "";

  let prevResult = countAndSay(n - 1);

  let prevResultLength = prevResult.length;
  let prevNums = [];

  for (let i = 0; i < prevResultLength; i += 1) {
    const now = prevResult[i];
    if (prevNums.length && prevNums[0] !== now) {
      result = getUpdatedResult(result, prevNums.length, prevNums[0]);
      prevNums = [];
    }
    prevNums.push(now);
    if (isLastIndex(i, prevResult.length) && prevNums.length) {
      result = getUpdatedResult(result, prevNums.length, prevNums[0]);
    }
  }
  return result;
};

console.log(countAndSay(4));
