const solution = (land, P, Q) => {
  let result;

  const flattedLand = land.flat();
  const floorSet = [...new Set(flattedLand)].sort((a, b) => a - b);

  let start = 0;
  let end = floorSet.length;

  let mid = Math.floor((start + end) / 2);

  const getCost = (mid) => {
    if (mid === undefined) return Infinity;

    let addBlockCnt = 0;
    let removeBlockCnt = 0;

    for (let i = 0; i < flattedLand.length; i += 1) {
      const diff = mid - flattedLand[i];

      if (diff > 0) {
        addBlockCnt += diff;
      } else {
        removeBlockCnt += diff * -1;
      }
    }

    return addBlockCnt * P + removeBlockCnt * Q;
  };

  while (start <= end) {
    const midCost = getCost(floorSet[mid]);
    const upperFloorCost = getCost(floorSet[mid + 1]);

    if (midCost < upperFloorCost) {
      result = midCost;
      end = mid - 1;
    } else {
      start = mid + 1;
    }

    mid = Math.floor((start + end) / 2);
  }

  return result;
};

(() => {
  const land = [
    [1, 2],
    [2, 3],
  ];
  const P = 3;
  const Q = 2;
  console.log(solution(land, P, Q));
})();

(() => {
  const land = [
    [4, 4, 3],
    [3, 2, 2],
    [2, 1, 0],
  ];
  const P = 5;
  const Q = 3;
  console.log(solution(land, P, Q));
})();
