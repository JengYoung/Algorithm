const getSortArray = (arr , func = undefined) => {
  return arr.sort(func);
}

const binarySearch = (arr, budget) => {
  let left = 0; 
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const total = arr
      .slice(0, mid + 1)
      .reduce((arr, cur) => arr + cur, 0);
    if (total === budget) return mid + 1;
    if (total < budget) left = mid + 1
    else right = mid - 1;
  }
  return left;
}
// 1. 정렬해줄 것.
// 2. 이분탐색해줄 것.
// 3. 결과적으로 최대의 값을 구해줄 것.
const solution = (d, budget) => {
  return binarySearch(getSortArray(d, (a, b) => a - b), budget);
}

(() => {
  const d = [10,10,10,10,10,10];
  const budget = 10;
  console.log(solution(d,budget))
})();