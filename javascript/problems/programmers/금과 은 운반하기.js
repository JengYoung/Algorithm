const a = 10; // 금
const b = 10; // 은

const g = [100];
const s = [100];
const w = [7];
const t = [10]; // 편도 -> 왕복이면 * 2

/*
  1 2 3 4 5 6 7 8 9 - 정렬된 곳에서, 정해진 길이의 배열에서 값을 기준으로 찾는 것

  100000
  50000
  75000
  정해지지 않은 길이(값)에서 어떤 값을 찾아내는 것. -> 최대 값을 알아야 함(정해진 길이를 만들어내는 것.)
*/

const solution = (a, b, g, s, w, t) => {
  const num = g.length;

  const maxTime = 2 * Math.pow(10, 5);
  const maxTotal = 2 * Math.pow(10, 9);
  let start = 0;
  let end = maxTime * maxTotal;

  let mid;
  let answer = 0;

  while (start <= end) {
    mid = Math.floor((start + end) / 2); // 시간

    let totalG = 0;
    let totalS = 0;

    let add = 0;

    for (let i = 0; i < num; i += 1) {
      // 어떤 도시에서 어떤 목적지로 가는 트럭의 경우 값을 다 더한다는 로직
      const nowG = g[i];
      const nowS = s[i];
      const nowW = w[i];
      const nowT = t[i]; // 20s

      let moveCnt = Math.floor(mid / (nowT * 2)); // mid = 1 -> 못 운반하죠?
      if (mid % (nowT * 2) >= nowT) {
        moveCnt += 1;
      }

      totalG += Math.min(nowW * moveCnt, nowG);
      totalS += Math.min(nowW * moveCnt, nowS);

      add += Math.min(nowG + nowS, nowW * moveCnt);
    }

    const isPossible = totalG >= a && totalS >= b && add >= a + b;
    if (isPossible) {
      end = mid - 1;
      answer = mid;
    } else {
      start = mid + 1;
    }
  }

  return answer;
};

console.log(solution(a, b, g, s, w, t)); // 499;
