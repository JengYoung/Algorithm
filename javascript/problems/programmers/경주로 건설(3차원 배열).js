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
      return col === 1 ? [-1, -1, -1, -1] : [0, 0, 0, 0];
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
    for (let i = 0; i < 4; i += 1) {
      const [dx, dy] = directions[i];
      const nx = nowX + dx;
      const ny = nowY + dy;
      const isSameDirection =
        lastDirection === undefined || lastDirection === i;
      const nextCost = cost + (isSameDirection ? 100 : 600);

      if (
        nx >= 0 &&
        ny >= 0 &&
        nx <= targetX &&
        ny <= targetY &&
        (changedBoard[nx][ny][i] === 0 || changedBoard[nx][ny][i] >= nextCost)
      ) {
        changedBoard[nx][ny][i] = nextCost;
        for (let j = 0; j < 4; j += 1) {
          if (i === j) continue;
          changedBoard[nx][ny][j] = changedBoard[nx][ny][j]
            ? Math.min(changedBoard[nx][ny][j], nextCost + 600)
            : nextCost + 600;
        }
        queue.enqueue([nx, ny, nextCost, i]);
      }
    }
  }

  const result = Math.min(
    ...Object.values(changedBoard[targetX][targetY]).filter((val) => val !== 0)
  );
  return result;
};

(() => {
  const board = [
    [0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 1],
    [0, 0, 1, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 1, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0],
  ];

  console.log(solution(board));
})();

(() => {
  const board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  console.log(solution(board));
})();

(() => {
  const board = [
    [0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 0],
    [0, 0, 1, 0, 0, 0],
    [1, 0, 0, 1, 0, 1],
    [0, 1, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0],
  ];

  console.log(solution(board));
})();

(() => {
  const board = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 1, 1, 1, 1, 1, 0],
    [1, 0, 0, 1, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 0],
  ];

  console.log(solution(board));
})();
