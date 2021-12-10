# 금과 은 운반하기

## 풀이 느낌 요약

언뜻 보면 우선순위 큐 문제 같지만, 결과적으로는 이분 탐색이 필요하던 문제

## 풀이 과정

처음에는 우선순위 큐로 구현하면 어떨까 고민하던 중, 문제 조건을 보고 이건 아니다 싶었다.
그 이유는, value에 대한 제한 값이 매우 컸기 때문이다.
최악의 경우에는 10번의 연산이 필요했는데, 이는 우선순위 큐로는 시간 초과가 뻔했다.

따라서 이를 해결하기 위해서는 logN의 연산이 필수였기에, 이분 탐색으로 접근했다.

1. 이분 탐색으로 접근하자. 그렇다면 시간의 start는 0, end는 10^9라고 할 수 있다.
2. 이때, 시간을 반씩 줄여나가면서 탐색한다.
3. 가장 중요한 부분이다. 결국 어떤 조건으로 탐색을 실시할 것인지를 명시해줘야 하기 때문이다.
   - 여기서 내가 떠올린 것은 '우선 탐색'이다. 
   - 금을 우선 탐색했을 경우에 금을 다 얻을 수 있고, 은을 우선 탐색했을 경우에도 은을 다 얻을 수 있으며 
   - 그리고 현재 운반한 자원의 총 합이 결과적으로 더 많으면 이 친구들은 해당 시간 안에 금을 캘 수 있는 것이다.
4. 이때는 시간을 더 줄여주고, 아니라면 시간을 더 늘려주는 로직을 돌린다.
5. 또한, 가능할 때에만 결과 값을 업데이트한다.
6. 결과적으로 start와 end가 수렴하게 됐을 때, 결과 값인 `answer`을 리턴한다.

## 코드
```js
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
```
