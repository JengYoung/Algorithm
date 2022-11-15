/**
 * @description:
 * 투포인터라 생각했는데 생각해보니 투포인터로 접근하기 힘들 듯해서 반복문으로 풀어야겠다.
 * 생각해보니 배열의 최대 크기는 86400 * 1000 = 86400000이 나오는데, 이건 좀 별로인 듯해서다.
 * 그냥 로그 수가 작으니, 업데이트되는 시점은 바로 시작시간이니 시작시간으로 체크한다.
 *
 * @todo
 * 1. 초를 * 1000하여 배열로 접근할 수 있도록 한다. 배열의 크기는 최대 3000임을 알 수 있다.
 * 2. +new Date()를 활용하여 시간을 구한다.
 * 3. 시간에 따른 시작 처리 시간을 구하여 다시 정렬한다.
 * 4. 정렬했을 때 첫 처리를 시작한 구간을 0으로 잡는다.
 * 5. 그 다음 쭉 반복문을 이용하여 시작시점을 기점으로 1초 시 어디까지 가능한지를 계산한다.
 * 6. 최대값을 매번 비교 후 업데이트해서, 반환한다.
 */

const getSortedArray = (arr) => [...arr].sort((a, b) => a[0] - b[0]);
function solution(lines) {
  let result = 0;

  // 1 ~ 2
  const arr = lines.map((line) => {
    const [date, time, ms] = line.split(' ');
    const dateTimestamp = +new Date(`${date}  ${time}`);
    const msNum = ms.replace(/s$/, '') * 1000;

    return [dateTimestamp - msNum, msNum];
  });

  // 3
  const sortedArr = getSortedArray(arr);
  const minTimeStamp = sortedArr[0][0];

  // 4
  const refinedArr = sortedArr.map(([timestamp, ms]) => [
    timestamp - minTimeStamp,
    ms,
  ]);

  console.log(refinedArr);

  // 5
  for (let i = 0; i < refinedArr.length; i += 1) {
    const now = refinedArr[i][0];

    let cnt = 1;
    for (let j = i + 1; j < refinedArr.length; j += 1) {
      const next = refinedArr[j][0];

      console.log(now, result);

      if (next - now <= 1000) cnt += 1;
      else break;
    }

    result = Math.max(result, cnt);
  }

  return result;
}

const START = 'S';
const END = 'E';

function solution(lines) {
  const times = [];
  for (const line of lines) {
    const [date, finish, duration] = line.split(' ');
    const millis = getTimeStamp(date, finish);

    const startTime =
      millis - duration.substr(0, duration.length - 1) * 1000 + 1;
    const endTime = millis + 999;

    times.push([START, startTime]);
    times.push([END, endTime]);
  }

  times.sort((a, b) => (a[1] !== b[1] ? a[1] - b[1] : -1));

  let answer = 0;
  let count = 0;

  for (const time of times) {
    if (time[0] === START) count++;
    else count--;

    answer = Math.max(answer, count);
  }

  return answer;
}

const getTimeStamp = (date, time) => {
  const MIN_TIME = +new Date('2016-09-15 00:00:00.000');
  const now = +new Date(`${date} ${time}`);

  return now - MIN_TIME;
};

const lines = [
  '2016-09-15 20:59:57.421 0.351s',
  '2016-09-15 20:59:58.233 1.181s',
  '2016-09-15 20:59:58.299 0.8s',
  '2016-09-15 20:59:58.688 1.041s',
  '2016-09-15 20:59:59.591 1.412s',
  '2016-09-15 21:00:00.464 1.466s',
  '2016-09-15 21:00:00.741 1.581s',
  '2016-09-15 21:00:00.748 2.31s',
  '2016-09-15 21:00:00.966 0.381s',
  '2016-09-15 21:00:02.066 2.62s',
];

console.log(solution(lines));
