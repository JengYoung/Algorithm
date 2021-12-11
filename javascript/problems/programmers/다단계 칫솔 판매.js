const getChargedMoney = (money) => {
  return money < 10 ? money : money - Math.floor(money * 0.1);
};

const getInitializedObjs = (enroll, referral) => {
  const parents = {};
  const results = {}; // 최종 결과

  const enrollLength = enroll.length;
  for (let i = 0; i < enrollLength; i += 1) {
    const nowEnroll = enroll[i];
    const nowReferral = referral[i];
    parents[nowEnroll] = nowReferral;
    results[nowEnroll] = 0;
  }

  return { parents, results };
};

const backTracking = (node, money, parents, results) => {
  const parent = parents[node];
  if (parent === "-" || getChargedMoney(money) < 1) {
    results[node] += getChargedMoney(money);
    return;
  }

  results[node] += getChargedMoney(money);
  backTracking(parent, money - getChargedMoney(money), parents, results);
};

const solution = (enroll, referral, seller, amount) => {
  const { parents, results } = getInitializedObjs(enroll, referral);

  const sellLength = seller.length;
  for (let i = 0; i < sellLength; i += 1) {
    backTracking(seller[i], amount[i] * 100, parents, results);
  }

  const answer = [];
  enroll.forEach((now) => {
    answer.push(results[now]);
  });
  return answer;
};
