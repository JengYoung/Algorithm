# 표 편집

## 요약

양방향 연결 리스트를 구현하여야 풀 수 있는 문제.

## 풀이 과정

맨 처음 문제 제한 케이스를 보자마자 바로 생각이 들었다.  
이것은, 절대 단순 리스트로는 풀 수 없다는 그런 생각이 말이다.

그 이유는, 삽입 삭제가 얼마나 일어날지 모르는 상황 속에서, 케이스가 1000000개까지 주어지기 때문이었다.

따라서... 고민 끝에 처음으로 양방향 연결리스트를 구현하여 풀었다.

풀이 과정을 적자면 다음과 같다.

1. 삽입, 삭제, 인덱스 이동이 가능한 양방향 연결 리스트를 만든다.
2. 주어진 커맨드에 맞게 조작하고 업데이트한다.
3. 모든 커맨드가 끝나면, 업데이트된 결과를 반환한다.

이렇게 쓰니까 쉬워보였겠지만...  
양방향 연결 리스트 구현은 처음이라 체감 난이도는 Level4에 가까웠던 문제. (시간도 꽤 걸렸다.)

## 코드
```js
class LinkedList {
  constructor(value, n) {
    this.result = [];
    this.nowNode = null;
    this.idx = null;
    this.head = null;
    this.tail = null;
    this.lastIndex = null;

    this.initialize(value, n);
  }

  initialize(value, n) {
    this.result = new Array(n).fill("O");
    this.nowNode = this.getNewNode(value);
    this.nowNode.prev = this.nowNode;
    this.nowNode.next = this.nowNode;
    this.idx = 0;
    this.head = this.nowNode;
    this.tail = this.nowNode;
    this.lastIndex = n - 1;
  }

  append(value) {
    const newNode = this.getNewNode(value, this.tail, this.head);
    this.tail.next = newNode;
    this.tail = newNode;
    this.head.prev = newNode;
    this.lastIndex = value;
    return this;
  }

  remove() {
    const targetNode = this.nowNode;
    const { prev, next, value } = targetNode;
    prev.next = next;
    next.prev = prev;
    this.result[value] = "X";

    if (this.lastIndex === value) {
      this.lastIndex = prev.value;
      this.nowNode = prev;
    } else {
      this.nowNode = next;
    }

    return targetNode;
  }

  insert(node) {
    const { prev, next, value } = node;
    prev.next = node;
    next.prev = node;
    this.result[node.value] = "O";

    if (this.lastIndex < value) {
      this.lastIndex = value;
    }
  }

  getNewNode(value, prev = null, next = null) {
    return {
      value,
      prev,
      next,
    };
  }

  moveUp(cnt) {
    for (let i = 0; i < cnt; i += 1) {
      this.nowNode = this.nowNode.prev;
    }
  }
  moveDown(cnt) {
    for (let i = 0; i < cnt; i += 1) {
      this.nowNode = this.nowNode.next;
    }
  }
}

const solution = (n, k, cmd) => {
  const removeStore = [];
  const commandHandlers = {
    C: () => removeStore.push(list.remove()),
    U: (cnt) => list.moveUp(cnt),
    D: (cnt) => list.moveDown(cnt),
    Z: () => list.insert(removeStore.pop()),
  };

  const list = new LinkedList(0, n);
  for (let i = 1; i < n; i += 1) {
    list.append(i);
  }

  list.moveDown(k);

  cmd.forEach((command) => {
    const [nowCommand, cnt] = command.split(" ");
    commandHandlers[nowCommand](cnt);
  });

  return list.result.join("");
};
```

## 참고 링크

실제로 이에 대한 영감을 얻어, 양방향 연결 리스트를 TIL로 작성하였다.   

[링크](https://nonstop-fender-e38.notion.site/faa8e1f52e264612a9ad82443ff8742e)
