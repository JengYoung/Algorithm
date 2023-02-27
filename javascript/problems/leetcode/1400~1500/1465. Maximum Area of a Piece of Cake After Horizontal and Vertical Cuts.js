const getMaxLength = (size, cuts) => {
  let maxSize = 0;
  [0, ...cuts, size]
    .sort((a, b) => a - b)
    .forEach((nowValue, nowIdx, arr) => {
      if (!nowIdx) return;
      maxSize = Math.max(maxSize, nowValue - arr[nowIdx - 1]);
    });

  return BigInt(maxSize);
};

const maxArea = (h, w, horizontalCuts, verticalCuts) => {
  const modulo = BigInt(1000000007);
  return (
    (getMaxLength(h, horizontalCuts) * getMaxLength(w, verticalCuts)) % modulo
  );
};

const h = 1000000000;
const w = 1000000000;
const horizontalCuts = [2];
const verticalCuts = [2];
console.log(maxArea(h, w, horizontalCuts, verticalCuts));
