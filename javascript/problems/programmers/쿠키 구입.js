// 구간합을 구하는 함수 생성
const getPrefixSum = (arr) => {
  const arrLength = arr.length;
  const arrPrefixSum = new Array(arrLength + 1).fill(0);

  for (let i = 0; i < arrLength; i += 1) {
    const now = arr[i];
    arrPrefixSum[i + 1] = now + arrPrefixSum[i];
  }
  return arrPrefixSum;
};

const solution = (cookie) => {
  if (cookie.length === 1) return 0;

  let result = 0;

  const cookiePrefixSum = getPrefixSum(cookie);
  const cookieLength = cookie.length;

  // 기준점 이동시키기
  for (let m = 0; m < cookieLength - 1; m += 1) {
    const leftEnd = m;
    const rightStart = m + 1;

    let leftStart = leftEnd;
    let rightEnd = rightStart;

    while (leftStart >= 0 && rightEnd < cookieLength) {
      let nowLeftSum = cookiePrefixSum[m + 1] - cookiePrefixSum[leftStart];
      let nowRightSum = cookiePrefixSum[rightEnd + 1] - cookiePrefixSum[m + 1];

      if (nowLeftSum === nowRightSum) {
        result = Math.max(nowLeftSum, result);
        rightEnd += 1;
        leftStart -= 1;
      } else if (nowLeftSum < nowRightSum) {
        leftStart -= 1;
      } else {
        rightEnd += 1;
      }
    }
  }

  return result;
};

(() => {
  const cookie = [1, 1, 2, 3];
  console.log(solution(cookie));
})();

(() => {
  const cookie = [1, 2, 4, 5];
  console.log(solution(cookie));
})();
