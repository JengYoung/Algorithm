function solution(lottos, win_nums) {
  const ranks = {
    0: 6,
    1: 6,
    2: 5,
    3: 4,
    4: 3,
    5: 2,
    6: 1,
  };
  const countCorrects = lottos.filter((lotto) =>
    win_nums.includes(lotto)
  ).length;
  const countZeros = lottos.filter((lotto) => !lotto).length;
  return [ranks[countCorrects + countZeros], ranks[countCorrects]];
}

const lottos = [44, 1, 0, 0, 31, 25];
const win_nums = [31, 10, 45, 1, 6, 19];

console.log(solution(lottos, win_nums));
