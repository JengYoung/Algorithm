function solution(weights) {
  let result = 0;

  const map = new Map();

  // 먼저 map에 weight 정보를 추가
  weights.forEach((weight) => {
    map.set(weight, (map.get(weight) ?? 0) + 1);
  });

  map.forEach((value, key) => {
    // 상대편의 경우의 수를 모두 추려냄.
    [key, (key * 3) / 2, (key * 4) / 3, key * 2].forEach((partnerWeight) => {
      // 만약 상대방의 몸무게에 관하여 정보가 없으면, 짝꿍이 될 수 없음.
      if (!map.has(partnerWeight)) {
        return;
      }

      // 몸무게가 같은 경우 = N개 중 2개를 뽑아내는 조합
      if (key === partnerWeight) {
        result += (value * (value - 1)) / 2;
        return;
      }

      const partnerWeightCount = map.get(partnerWeight);

      // 몸무게가 다른 경우 = 서로의 곱만큼 경우의 수 가능
      result += partnerWeightCount * value;
    });
  });

  return result;
}
