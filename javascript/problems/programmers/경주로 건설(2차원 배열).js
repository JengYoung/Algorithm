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
