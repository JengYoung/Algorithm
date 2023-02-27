const getDays = (weights, shipWeight) => {
  let cnt = 0;
  let nowLoadWeight = 0;

  for (const weight of weights) {
    if (nowLoadWeight + weight <= shipWeight) {
      nowLoadWeight += weight;
    } else {
      cnt += 1;
      nowLoadWeight = weight;
    }
  }

  return cnt + !!nowLoadWeight;
};

const parametricSearch = (start, end, weights, days) => {
  while (start <= end) {
    const mid = Math.floor((start + end) / 2);

    const nowDay = getDays(weights, mid);

    if (nowDay <= days) {
      if (getDays(weights, mid - 1) <= days) {
        return parametricSearch(start, mid - 1, weights, days);
      } else {
        return mid;
      }
    } else {
      start = mid + 1;
    }
  }

  return start;
};

/**
 * @param {number[]} weights
 * @param {number} days
 * @return {number}
 */
const shipWithinDays = (weights, days) => {
  const maxWeight = Math.max(...weights);
  const minShipWeight = Math.max(
    maxWeight * Math.ceil(weights.length / days),
    maxWeight
  );

  const result = parametricSearch(maxWeight, minShipWeight, weights, days);

  return result;
};

{
  const weights = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const days = 5;

  console.log(shipWithinDays(weights, days));
}

{
  const weights = [1, 2, 3, 1, 1];
  const days = 4;

  console.log(shipWithinDays(weights, days));
}

{
  const weights = [
    370, 367, 266, 227, 469, 409, 265, 413, 6, 31, 165, 81, 484, 402, 486, 322,
    365, 358, 130, 123, 97, 349, 105, 109, 341, 332, 219, 253, 364, 342,
  ];
  const days = 30;

  console.log(shipWithinDays(weights, days));
}
