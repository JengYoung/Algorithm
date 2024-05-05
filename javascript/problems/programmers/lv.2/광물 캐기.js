/*
 * 1. 일단 5개씩 미네랄을 분리한다.
 * 2. 5개에 대한 각각의 곡괭이별 피로도 합을 구한다.
 * 3. 곡괭이의 수를 맞춘다. 이때 가장 피로도가 많이 드는 순으로 곡괭이들을 제거한다.
 * 4. 5개씩 미네랄을 분리한 케이스들을 돌 / 철 / 다이아몬드 순으로 역으로 분리한다.
 * 5. 돌 / 철 / 다이아몬드 순으로 곡괭이를 사용하면서 피로도를 계산한다.
 * 6. 결과를 반환한다.
 */

// * 1. 일단 5개씩 미네랄을 분리한다.
const getFormattedMinerals = (minerals) => {
  const formattedMinerals = [];
  for (const mineral of minerals) {
    const lastValue = formattedMinerals.at(-1);

    if (!lastValue || lastValue.length === 5) {
      formattedMinerals.push([mineral]);
      continue;
    }

    lastValue.push(mineral);
  }

  return formattedMinerals;
};

// 2. 5개에 대한 각각의 곡괭이별 피로도 합을 구한다.
const getFatigueSum = (minerals) => {
  return minerals.reduce(
    (acc, cur) => {
      if (cur === 'diamond') {
        return {
          diamond: acc.diamond + 1,
          iron: acc.iron + 5,
          stone: acc.stone + 25,
        };
      }

      if (cur === 'iron') {
        return {
          diamond: acc.diamond + 1,
          iron: acc.iron + 1,
          stone: acc.stone + 5,
        };
      }

      return {
        diamond: acc.diamond + 1,
        iron: acc.iron + 1,
        stone: acc.stone + 1,
      };
    },
    {
      diamond: 0,
      iron: 0,
      stone: 0,
    }
  );
};

const getPicks = (picks, requireCount) => {
  const result = { ...picks };

  let total = result.diamond + result.iron + result.stone;

  const isNotEnoughPicks = total - requireCount < 0;

  while (total > 0 && total - requireCount > 0) {
    total -= 1;

    if (result.stone) {
      result.stone -= 1;
      continue;
    }

    if (result.iron) {
      result.iron -= 1;
      continue;
    }

    result.diamond -= 1;
  }

  return {
    isNotEnoughPicks,
    data: result,
  };
};

function solution(picks, minerals) {
  const mineral = getFormattedMinerals(minerals).map(getFatigueSum);

  const { isNotEnoughPicks, data: requiredPicks } = getPicks(
    {
      diamond: picks[0],
      iron: picks[1],
      stone: picks[2],
    },
    mineral.length
  );

  const total = picks.reduce((acc, cur) => acc + cur, 0);
  const willMinedMineral = isNotEnoughPicks ? mineral.slice(0, total) : mineral;

  willMinedMineral.sort((a, b) => {
    if (a.stone - b.stone !== 0) return a.stone - b.stone;
    if (a.iron - b.iron !== 0) return b.iron - a.iron;

    return b.diamond - a.diamond;
  });

  let result = 0;

  willMinedMineral.forEach((fatigues) => {
    if (requiredPicks.stone > 0) {
      requiredPicks.stone -= 1;
      result += fatigues.stone;
      return;
    }

    if (requiredPicks.iron > 0) {
      requiredPicks.iron -= 1;
      result += fatigues.iron;
      return;
    }

    requiredPicks.diamond -= 1;
    result += fatigues.diamond;
    return;
  });

  return result;
}
