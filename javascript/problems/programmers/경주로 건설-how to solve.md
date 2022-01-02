# 경주로 건설

## 문제 요약

꽤나 까다로웠던 BFS 문제.

## 해결 과정.

### 방향을 기억하여 큐를 진행
맨 처음에는 단순히 방향 없이 해결하고자 했다.  
따라서, 코너를 정확히 인식하지 못하는 문제가 발생했고, 이를 해결하고자 방향을 큐에 삽입했다.

### 예외 처리.
그러나 다 풀었을 때, 25번에서 문제가 오류가 나는 상황이 발생했다.
이는 다음과 같은 예외상황이 있기 때문이다.

```
         14 13
17 (18 | 20)
   (24 | 21)
```
> cost = 17인 값이 방향은 같을 경우 -> 18 -> 방향을 틀었을 경우 -> 24 
> cost = 14인 값이 방향을 틀었을 경우 -> 20 -> 쭉 나아갈 경우 -> 21

따라서 이를 해결해주기 위해 3차원 배열을 사용했다.

### 최적화

#### 큐 커스터마이징
아무래도 `shift` 때문에 생긴 이슈라고 생각했다.  
따라서, 직접 큐를 구현하니, 두 개의 시간 초과 중 하나를 해결했다.

#### 값 허용 범위 수정
그러나 큐를 진행했을 때, 시간초과가 난다.  
따라서, 시간초과에 있어 원인은, 3차원 배열로 했을 때, 일반적인 나머지들의 값의 허용 범위를 지정해주지 않았기 때문이었다.

따라서, 나머지 값들의 허용 범위를 지정해주니 통과.


### 2차원 배열

결국 저 허용 범위라는 것을 반드시 지정해줘야 한다면, 2차원 배열에서 푸는 것과 마찬가지의 로직을 구현할 수 있겠다는 생각이 들었다.

따라서 `nextCost`를 저장하는 값을 최적화한 로직을 구현하니, 통과하였다.


### 정리

1. 큐를 구현한다.
2. 큐에는 일반적인 최소 경로를 구하는 것과 똑같이 진행한다. 이때, 큐에 들어갈 것은, `[x, y, 비용, 방향]`이다.
3. 쭉 돌리며 nx, ny 및 다음 방향 및 이에 따른 비용을 계산한다. 
4. 방향이 다를 경우, 같을 경우에 따라서 큐에 넣는 로직을 구현한다.
5. 결과적으로 원하는 타겟 인덱스에 저장된 최솟값을 도출한다.

## 코드
```js
class Queue {
  constructor() {
    this.queue = [];
    this.front = 0;
    this.rear = 0;
  }
  enqueue(value) {
    this.queue[this.rear++] = value;
  }
  dequeue() {
    const value = this.queue[this.front];
    delete this.queue[this.front];
    this.front += 1;
    return value;
  }
  peek() {
    return this.queue[this.front];
  }
  size() {
    return this.rear - this.front;
  }
}

const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

const getChangedBoard = (board) => {
  return board.map((row) => {
    return row.map((col) => {
      return col === 1 ? -1 : 0;
    });
  });
};

const solution = (board) => {
  const changedBoard = getChangedBoard(board);
  const queue = new Queue();
  const [targetX, targetY] = [
    changedBoard.length - 1,
    changedBoard[0].length - 1,
  ];

  queue.enqueue([0, 0, 0]); // [[nowX, nowY]]
  changedBoard[0][0] = -1;

  while (queue.size()) {
    const [nowX, nowY, cost, lastDirection] = queue.dequeue();
    if (nowX === targetX && nowY === targetY) {
      continue;
    }
    for (let nowDirection = 0; nowDirection < 4; nowDirection += 1) {
      const [dx, dy] = directions[nowDirection];
      const nx = nowX + dx;
      const ny = nowY + dy;
      const isSameDirection =
        lastDirection === undefined || lastDirection === nowDirection;
      const nextCost = cost + (isSameDirection ? 100 : 600);

      if (
        nx >= 0 &&
        ny >= 0 &&
        nx <= targetX &&
        ny <= targetY &&
        (changedBoard[nx][ny] === 0 ||
          changedBoard[nx][ny] >= nextCost ||
          (!isSameDirection && changedBoard[nx][ny] >= nextCost - 600))
      ) {
        const compValue = changedBoard[nx][ny];
        changedBoard[nx][ny] = compValue
          ? Math.min(compValue, nextCost)
          : nextCost;
        queue.enqueue([nx, ny, nextCost, nowDirection]);
      }
    }
  }

  const result = changedBoard[targetX][targetY];
  return result;
};

```
