/*
  1. 이분탐색을 위한 함수
  2. 체크할 때 true, false를 내뱉는 함수
*/

const isAllCrossed = (stones, k, mid) => {
  let cnt = 0;
  let flag = true;
  stones.forEach((stone) => {
    if (!flag) return;
    cnt = (stone <= mid) ? cnt + 1 : 0;
    if (cnt >=  k) {
      flag = false;
    }
  })
  return flag;
}

const binarySearch = (arr, k) => {
  let start = 1;
  let end = 200000000;
  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    if (isAllCrossed(arr, k, mid)) start = mid + 1
    else end = mid - 1
  }
  return start;
}

const solution = (stones, k) => {
  return binarySearch(stones, k);
}

(() => {
  const stones = [2, 4, 5, 3, 2, 1, 4, 2, 5, 1];
  const k = 3;
  console.log(solution(stones, k))
})();