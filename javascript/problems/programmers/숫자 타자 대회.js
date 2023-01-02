/**
 * [x] 최소 이동 가중치 배열을 생성한다.
 * [x] DP[N][L][R]을 생성한다. 이는 CASE가 N번째인 경우 왼손이 누른 위치, 오른 손이 누른 위치를 기억한다.
 * [x] 따라서 DP[N + 1] = Math.min(DP[N][L][R], DP[N][L][R])일 것이다.
 * [x] 결과를 반환한다.
 *
 * [x] 공간 복잡도 = 11000000 (n + 1)
 * [x] 시간 복잡도 = O(N * M * 2) = 100000 * 10 * 10 = 10000000
 * [x] 따라서 문제 통과할 듯...?
 */

const weights = [
  [1, 7, 6, 7, 5, 4, 5, 3, 2, 3],
  [7, 1, 2, 4, 2, 3, 5, 4, 5, 6],
  [6, 2, 1, 2, 3, 2, 3, 5, 4, 5],
  [7, 4, 2, 1, 5, 3, 2, 6, 5, 4],
  [5, 2, 3, 5, 1, 2, 4, 2, 3, 5],
  [4, 3, 2, 3, 2, 1, 2, 3, 2, 3],
  [5, 5, 3, 2, 4, 2, 1, 5, 3, 2],
  [3, 4, 5, 6, 2, 3, 5, 1, 2, 4],
  [2, 5, 4, 5, 3, 2, 3, 2, 1, 2],
  [3, 6, 5, 4, 5, 3, 2, 4, 2, 1],
];

const solution = (numbers) => {
  let left = 4;
  let right = 6;

  const DP = Array.from({ length: numbers.length + 1 }, () =>
    Array.from({ length: 10 }, () => new Array(10).fill(Infinity))
  );

  DP[0][left][right] = 0;

  for (let idx = 0; idx < numbers.length; idx += 1) {
    const num = numbers[idx];

    const prevDP = DP[idx];
    const nowDP = DP[idx + 1];

    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        const prevValue = prevDP[i][j];
        if (i === j || prevValue === Infinity) continue;

        if (num !== j) {
          nowDP[num][j] = Math.min(nowDP[num][j], prevValue + weights[i][num]);
        }
        if (num !== i) {
          nowDP[i][num] = Math.min(nowDP[i][num], prevValue + weights[num][j]);
        }
      }
    }
  }

  return Math.min(...DP[numbers.length].flat().flat());
};

{
  const numbers = '1756';
  console.log(solution(numbers)); // 10
}

{
  const numbers = '5123';
  console.log(solution(numbers)); // 8
}
