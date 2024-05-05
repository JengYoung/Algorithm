function solution(weights) {
  let result = 0;

  const map = new Map();

  weights.forEach((weight) => {
    map.set(weight, (map.get(weight) ?? 0) + 1);
  });

  map.forEach((value, key) => {
    [key, (key * 3) / 2, (key * 4) / 3, key * 2].forEach((partnerWeight) => {
      if (!map.has(partnerWeight)) {
        return;
      }

      if (key === partnerWeight) {
        result += (value * (value - 1)) / 2;
        return;
      }

      const partnerWeightCount = map.get(partnerWeight);

      result += partnerWeightCount * value;
    });
  });

  return result;
}
