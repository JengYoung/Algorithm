/**
 * 1. 트리를 만든다.
 * 2. seller마다 루트까지 수익을 업데이트한다.
 * 3. 결과를 반환한다.
 */
function solution(enroll, referral, seller, amount) {
  const answer = [];

  const referralMap = {};

  enroll.forEach((to, index) => {
    const from = referral[index];

    referralMap[to] = referralMap[to] ?? {};

    referralMap[to] = {
      index,
      from,
      total: 0,
    };
  });

  referralMap['-'] = {
    index: -1,
    from: null,
    total: 0,
  };

  seller.forEach((s, i) => {
    let node = referralMap[s];
    let charge = amount[i] * 100;

    while (!!node && charge > 0) {
      const 뽀찌 = Math.floor(charge / 10);

      const revenue = charge - 뽀찌;

      charge = 뽀찌;
      node.total += revenue;

      node = referralMap[node.from];

      console.log(node, charge);
    }

    console.log({ s, i, referralMap });
  });

  return answer;
}

console.log(
  solution(
    ['john', 'mary', 'edward', 'sam', 'emily', 'jaimie', 'tod', 'young'],
    ['-', '-', 'mary', 'edward', 'mary', 'mary', 'jaimie', 'edward'],
    ['young', 'john', 'tod', 'emily', 'mary'],
    [12, 4, 2, 5, 10]
  )
); // [360, 958, 108, 0, 450, 18, 180, 1080]
