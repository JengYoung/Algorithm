class Queue {
  constructor() {
    this.queue = [];
    this.front = 0;
    this.rear = 0;
  }

  enqueue(val) {
    this.queue.push(val);
    this.rear += 1;
  }

  dequeue() {
    const value = this.queue[this.front];
    delete this.queue[this.front];
    this.front += 1;
    return value;
  }

  size() {
    return this.rear - this.front;
  }
}

const solution = (n, info) => {
  let initailizedApeachScore = 0;

  let maxDiff = 0;
  let maxArray = [-1];

  for (let i = 0; i < info.length; i += 1) {
    if (info[i]) initailizedApeachScore += 10 - i; // 초기 어피치 점수
  }

  const queue = [];

  queue.push([
    0,
    initailizedApeachScore,
    n,
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]); // 현재 총 점수, 어피치 점수, n 화살 남은 횟수, [조건을 따지지 않은 스코어], [현재의 배열 결과]

  while (queue.length) {
    const [ryanScore, apeachScore, remainCount, notCalculatedScore, nowArr] =
      queue.shift();

    if (!notCalculatedScore.length) {
      nowArr[10] += remainCount; // 계산하지 않은 값들은 모두 0에 넣어준다.

      if (apeachScore < ryanScore) {
        // console.log(ryanScore, apeachScore, nowArr);
        if (maxDiff < ryanScore - apeachScore) {
          maxDiff = ryanScore - apeachScore;
          maxArray = nowArr;
        }

        if (maxDiff === ryanScore - apeachScore) {
          for (let i = 10; i !== 0; i -= 1) {
            if (maxArray[i] !== nowArr[i]) {
              const check = maxArray[i] > nowArr[i];
              maxArray = check ? maxArray : nowArr;
              break;
            }
          }
        }
      }

      continue;
    }

    const nextNotCaculatedScore = [...notCalculatedScore];
    const score = nextNotCaculatedScore.pop();

    const winCount = info[10 - score] + 1;

    const nextArr = [...nowArr];
    nextArr[10 - score] = winCount;

    if (remainCount >= winCount) {
      queue.push([
        ryanScore + score,
        info[10 - score] ? apeachScore - score : apeachScore,
        remainCount - winCount,
        [...nextNotCaculatedScore],
        [...nextArr],
      ]); // 해당 조건에서 이겼을 경우
    }

    queue.push([
      ryanScore,
      apeachScore,
      remainCount,
      [...nextNotCaculatedScore],
      [...nowArr],
    ]);
  }

  return maxDiff, maxArray;
};

(() => {
  const n = 5;
  const info = [2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0];
  console.log(solution(n, info));
})();

(() => {
  const n = 1;
  const info = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  console.log(solution(n, info));
})();

(() => {
  const n = 9;
  const info = [0, 0, 1, 2, 0, 1, 1, 1, 1, 1, 1];
  console.log(solution(n, info));
})();

(() => {
  const n = 10;
  const info = [0, 0, 0, 0, 0, 0, 0, 0, 3, 4, 3];
  console.log(solution(n, info));
})();
