const solution = (participant, completion) => {
  const map = new Map();

  let result = 0;

  participant.forEach((p, index) => {
    map.set(p, (map.get(p) ?? []).concat([index]));

    result ^= index;
  });

  const targetIndex = completion.reduce((acc, cur) => {
    return (acc ^= map.get(cur).pop());
  }, result);

  return participant[targetIndex];
};

console.log(solution(['leo', 'kiki', 'eden'], ['eden', 'kiki']));
console.log(
  solution(
    ['marina', 'josipa', 'nikola', 'vinko', 'filipa'],
    ['josipa', 'filipa', 'marina', 'nikola']
  )
);

console.log(
  solution(['mislav', 'stanko', 'mislav', 'ana'], ['stanko', 'ana', 'mislav'])
);

var solution = (participant: string[], completion: string[]) => {
  return participant.find(
    (participant) => !completion[participant]--,
    completion.map(
      (participant) =>
        (completion[participant] = (completion[participant] | 0) + 1)
    )
  );
};
