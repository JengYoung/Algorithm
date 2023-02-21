/*
 1. 스택의 느낌이 물씬 난다...?
 2. 둘 중 더 먼 곳의 거리를 미리 더해놓는다.
 3. 택배를 떨굴 수 있는 만큼 스택으로 뒤에서 계속 차감한다.
 4. 반면 픽업에서는 가져갈 수 있는 만큼 스택으로 뒤에서 계속 빼낸다.
 */
function solution(cap, n, deliveries, pickups) {
  let result = 0;

  while (deliveries.length || pickups.length) {
    removeTailZero(deliveries);
    removeTailZero(pickups);

    const nextDist = Math.max(deliveries.length, pickups.length);
    result += nextDist * 2;

    arrangeBoxes(deliveries, cap);
    arrangeBoxes(pickups, cap);
  }

  return result;
}

function removeTailZero(arr) {
  while (arr.at(-1) === 0) {
    arr.pop();
  }
}

function arrangeBoxes(arr, cap) {
  let total = 0;

  while (arr.length && cap > total) {
    total += arr.pop();
  }

  if (total > cap) {
    arr.push(total - cap);
  }
}
console.log(solution(2, 7, [1, 0, 2, 0, 1, 0, 2], [0, 2, 0, 1, 0, 2, 0]));
