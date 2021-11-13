# 풀이 과정

핵심은 다음 문장이다.
> 고객이 원하는 방이 이미 배정되어 있으면 원하는 방보다 번호가 크면서 비어있는 방 중 가장 번호가 작은 방을 배정합니다.

따라서 '고객이 원하는 방'을 부모 노드로 연결해서, 타면서 이동하면 되는 것이다.

그렇다면 어떻게 타고 갈까?

여기서 `Union-find`를 적극적으로 활용한다.

모든 자식 노드는 부모 노드와 연결되어 있다.  
이를 거꾸로 생각하면, 부모 노드는 모든 연결된 자식 노드를 만들어낼 수도 있는 것이다.

따라서 '고객이 원하는 방'을 부모 노드라고 생각하면, 쉽게 해당 알고리즘을 구현할 수 있다.

여기서 주의할 게 있다. '배열'의 경우 k의 크기가 10**12이므로 불가능하다. 

또한 객체 역시 시간 초과가 나는 현상이 자바스크립트에서 발생했다.

따라서 `Map` 객체를 이용해서, 다음 유니온파인드를 응용하여 구현한다.


```js
const findParent = (number, parent) => {
  if (!parent.has(number)) {
    parent.set(number, number + 1);
    return number;
  }
  const next = findParent(parent.get(number), parent);
  parent.set(number, next + 1);
  return next;
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
```
