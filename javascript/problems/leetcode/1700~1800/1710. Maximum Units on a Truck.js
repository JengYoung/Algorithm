/**
 * @param {number[][]} boxTypes
 * @param {number} truckSize
 * @return {number}
 */
var maximumUnits = function (boxTypes, truckSize) {
  let size = 0; // 내가 여태까지 몇 개의 상자를 처리했는지
  let total = 0; // unit까지 계산한 것
  const sortedBoxTypes = [...boxTypes].sort((a, b) => a[1] - b[1]);
  // sort 비순수함수 - 원본을 해쳐요 -> 함수형을 쓸때 최대한 원본을 유지시키는 게 좋아서

  while (truckSize >= size && sortedBoxTypes.length) {
    const now = sortedBoxTypes.pop();

    if (now[0] + size >= truckSize) {
      const diff = truckSize - size;
      size = truckSize;
      total += diff * now[1];
      break;
    }

    size += now[0];
    total += now[0] * now[1];
  }

  return total;
};

export default maximumUnits;
