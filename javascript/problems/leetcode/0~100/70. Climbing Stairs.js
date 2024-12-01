/**
 * 1. 일정한 규칙을 찾아야 풀 수 있는 문제이다. 규칙을 생각해보자.
 * - 한 번에 1 ~ 2계단을 오를 수 있다.
 * - 이 말은 곧, DP[N] = DP[N - 1] + DP[N - 2]를 만족하게 된다.
 * 2. 따라서 Dynamic Programming을 통해 동적 계획법을 이용하여 점화식을 적용하면 끝난다. DP를 만들어주자.
 * 3. N만큼 점화식을 반복하여 업데이트한다.
 * 4. 결과를 반환한다.
 */
var climbStairs = function (n) {
  const DP = new Array(n).fill(0);

  const hash = (s) => {
    return s - 1;
  };

  DP[hash(1)] = 1;
  DP[hash(2)] = 2;

  for (let i = 3; i <= n; i += 1) {
    DP[hash(i)] = DP[hash(i - 1)] + DP[hash(i - 2)];
  }

  return DP[hash(n)];
};
