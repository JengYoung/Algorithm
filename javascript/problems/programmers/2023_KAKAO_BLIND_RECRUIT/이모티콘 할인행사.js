/**
 * 이모티콘마다 할인율은 다를 수 있으며, 할인율은 10%, 20%, 30%, 40% 중 하나로 설정됩니다.
 * 1. 이모티콘 플러스 서비스 가입자를 최대한 늘리는 것. (prior)
 * 2. 이모티콘 판매액을 최대한 늘리는 것. (minor)
 */

/*
 1. 각 사용자들은 자신의 기준에 따라 일정 비율 이상 할인하는 이모티콘을 모두 구매합니다.
 2. 각 사용자들은 자신의 기준에 따라 이모티콘 구매 비용의 합이 일정 가격 이상이 된다면, 이모티콘 구매를 모두 취소하고 이모티콘 플러스 서비스에 가입합니다.
 */

/*
 1. 모든 이모티콘의 할인의 경우의 수를 구함 = 4 ** 7
 2. 합의 경우의 수를 구한 다음, 여기서의 각각의 결과를 도출 => 가장 최대인 것을 만족하는 값을 얻어냄.
 3. 결과 반환.
 */

function getAllRateCases(rates, cnt, now = [], result = []) {
  if (now.length === cnt) {
    result.push(now);

    return result;
  }

  for (const rate of rates) {
    result = getAllRateCases(rates, cnt, [...now, rate], result);
  }

  return result;
}

function solution(users, emoticons) {
  const saleRates = [10, 20, 30, 40];

  const maximum = {
    subscriberCnt: 0,
    revenue: 0,
  };

  const allRateCases = getAllRateCases(saleRates, emoticons.length, [], []);

  allRateCases.forEach((rateCases) => {
    const status = new Array(users.length).fill(0);

    rateCases.forEach((rate, rateIdx) => {
      users.forEach(([rateThreshold], userIdx) => {
        if (rate >= rateThreshold) {
          status[userIdx] += (emoticons[rateIdx] * (100 - rate)) / 100;
        }
      });
    });

    let subscriberCnt = 0;
    let revenues = 0;

    status.forEach((total, idx) => {
      if (total >= users[idx][1]) {
        subscriberCnt += 1;
      } else {
        revenues += total;
      }
    });

    if (subscriberCnt > maximum.subscriberCnt) {
      maximum.subscriberCnt = subscriberCnt;
      maximum.revenue = revenues;
    } else if (subscriberCnt === maximum.subscriberCnt) {
      maximum.revenue = Math.max(revenues, maximum.revenue);
    }
  });

  return [maximum.subscriberCnt, maximum.revenue];
}

console.log(
  solution(
    [
      [40, 2900],
      [23, 10000],
      [11, 5200],
      [5, 5900],
      [40, 3100],
      [27, 9200],
      [32, 6900],
    ],
    [1300, 1500, 1600, 4900],
    [4, 13860]
  )
);
