/*
  1. 부모 노드가 있다면 비어있는 방을 저장한다.
  2. 부모 노드가 없다면 그대로 저장한다.
*/

const findParent = (number, parent) => {
  if (!parent.has(number)) {
    parent.set(number, number + 1); // 다음 노드에 대한 힌트를 전달해 줌.
    return number;
  } else {
    const next = findParent(parent.get(number), parent);
    parent.set(number, next + 1);
    return next;
  }
};

const solution = (k, room_number) => {
  const result = [];
  const parent = new Map();
  room_number.forEach((roomNum) => {
    result.push(findParent(roomNum, parent));
  });
  return result;
};

const k = 10;
const room_number = [1, 3, 4, 1, 3, 1];
console.log(solution(k, room_number));
