function factorial(n) {
  return n <= 1 ? 1 : n * factorial(n - 1);
}
/**
 * [x] 재귀를 통해 배열을 업데이트한다.
 * [x] 만약 배열의 길이가 1이면 백트래킹을 통해 결과를 가져오도록 한다.
 * [x] 재귀 안에서는 값을 업데이트 해야 하는데, 결국 맨 앞의 숫자는 (n - 1)!만큼 반복되는 결과에 의존한다.
 * [x] 따라서 이를 계산해준다. nextIndex에서는 (n - 1)!을 나눠준 다음 몫을 올림한다.
 *     이는 나머지가 없는 경우, 인덱스가 제대로 맵핑되지 않는 문제점을 극복하기 위해 고안했다.
 * [x] 이후 -1을 한다. 이는 인덱스를 매칭하기 위함이다.
 * [x] 이때, 나는 현재 k를 업데이트하지 않았다. 이유는 순수함수를 유지하여 안정성을 더해주기 위함이다.
 *     대신 나머지 연산 처리를 확실히 해줌으로써 nextIndex가 인덱스 내에 유지할 수 있도록 했다.
 * [x] 결과적으로 선언적으로 관리하고자 다음 array와 res를 각 함수별로 로직을 분리하여, 재귀를 수행한다.
 */

function getNextIndex(arr, k) {
  const facto = factorial(arr.length - 1);
  const nextIndex = (Math.ceil(k / facto) - 1 + arr.length) % arr.length;

  return nextIndex;
}

function getUpdatedArr(arr, index) {
  return arr.filter((_, idx) => idx !== index);
}

function getUpdatedRes(arr, res, index) {
  return [...res, arr[index]];
}

function solution(n, k) {
  const arr = Array.from({ length: n }, (_, idx) => idx + 1);

  function recursive(arr, res = []) {
    if (arr.length === 1) {
      return [...res, arr[0]];
    }

    const nextIndex = getNextIndex(arr, k);

    return recursive(
      getUpdatedArr(arr, nextIndex),
      getUpdatedRes(arr, res, nextIndex)
    );
  }

  return recursive(arr);
}

console.log(solution(1, 1)); // [1]

console.log(solution(2, 1)); // [1, 2]
console.log(solution(2, 2)); // [2, 1]

console.log(solution(3, 1)); // [1, 2, 3]
console.log(solution(3, 2)); // [1, 3, 2]
console.log(solution(3, 3)); // [2, 1, 3]
console.log(solution(3, 4)); // [2, 3, 1]
console.log(solution(3, 5)); // [3, 1, 2]
console.log(solution(3, 6)); // [3, 2, 1]

console.log(solution(4, 1)); // [1, 2, 3, 4]
console.log(solution(4, 2)); // [1, 2, 4, 3]
console.log(solution(4, 3)); // [1, 3, 2, 4]
console.log(solution(4, 4)); // [1, 3, 4, 2]
console.log(solution(4, 5)); // [1, 4, 2, 3]
console.log(solution(4, 6)); // [1, 4, 3, 2]

console.log(solution(4, 7)); // [2, 1, 3, 4]
console.log(solution(4, 8)); // [2, 1, 3, 4]
console.log(solution(4, 9)); // [2, 1, 3, 4]
console.log(solution(4, 10)); // [2, 1, 3, 4]
console.log(solution(4, 11)); // [2, 1, 3, 4]
console.log(solution(4, 12)); // [2, 1, 3, 4]

console.log(solution(4, 13)); // [3, 1, 2, 4]
console.log(solution(4, 14)); // [3, 1, 4, 2]
console.log(solution(4, 15)); // [3, 2, 1, 4]
console.log(solution(4, 16)); // [3, 2, 4, 1]
console.log(solution(4, 17)); // [3, 4, 1, 2]
console.log(solution(4, 18)); // [3, 4, 2, 1]

console.log(solution(4, 19)); // [4, 1, 2, 3]
console.log(solution(4, 20)); // [4, 1, 3, 2]
console.log(solution(4, 21)); // [4, 2, 1, 3]
console.log(solution(4, 22)); // [4, 2, 3, 1]
console.log(solution(4, 23)); // [4, 3, 1, 2]
console.log(solution(4, 24)); // [4, 3, 2, 1]
