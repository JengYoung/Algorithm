class Queue {
  constructor(arr) {
    this.queue = arr ? arr : [];
    this.front = 0;
    this.rear = arr ? arr.length - 1 : 0;
    this.length = arr ? arr.length : 0;
  }

  enqueue(val) {
    this.queue.push(val);

    this.rear += 1;
    this.length += 1;
  }

  dequeue() {
    const value = this.queue[this.front];

    delete this.queue[this.front];

    this.front += 1;
    this.length -= 1;

    return value;
  }
}

const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

const makeBoard = (rectangle) => {
  const board = Array.from({ length: 102 }, () => new Array(102).fill(0));

  rectangle.forEach((nowRectangle) => {
    const startX = nowRectangle[0] * 2;
    const startY = nowRectangle[1] * 2;
    const endX = nowRectangle[2] * 2;
    const endY = nowRectangle[3] * 2;

    for (let i = startX; i <= endX; i += 1) {
      for (let j = startY; j <= endY; j += 1) {
        board[i][j] = 1;
      }
    }
  });

  return board;
};

const bfs = (queue, board, itemX, itemY) => {
  const isBoarder = (x, y) => {
    const allDirections = [[1, 1], [-1, -1], [1, -1], [-1, 1], ...directions];

    for (let i = 0; i < 8; i += 1) {
      const [dx, dy] = allDirections[i];
      const nx = x + dx;
      const ny = y + dy;

      if (nx === 1 || ny === 1 || nx === 101 || ny === 101) return true;
      if (board[nx][ny] === 0) {
        return true;
      }
    }

    return false;
  };

  while (queue.length) {
    const [count, x, y] = queue.dequeue();
    board[x][y] = -1;

    if (x === itemX && y === itemY) return parseInt(count / 2);

    for (let i = 0; i < 4; i += 1) {
      const [dx, dy] = directions[i];
      const nx = x + dx;
      const ny = y + dy;

      if (
        nx >= 0 &&
        ny >= 0 &&
        nx <= 100 &&
        ny <= 100 &&
        board[nx][ny] === 1 &&
        isBoarder(nx, ny)
      ) {
        board[nx][ny] = -1;
        queue.enqueue([count + 1, nx, ny]);
      }
    }
  }
};

const solution = (rectangle, characterX, characterY, itemX, itemY) => {
  const refinedCharacterX = characterX * 2;
  const refinedCharacterY = characterY * 2;
  const refinedItemX = itemX * 2;
  const refinedItemY = itemY * 2;

  const board = makeBoard(rectangle);
  board[refinedCharacterX][refinedCharacterY] = -1;

  const queue = new Queue();
  queue.enqueue([0, refinedCharacterX, refinedCharacterY]); //  JSON.parse(JSON.stringify(board))

  return bfs(queue, board, refinedItemX, refinedItemY);
};

console.log(
  solution(
    [
      [1, 1, 7, 4],
      [3, 2, 5, 5],
      [4, 3, 6, 9],
      [2, 6, 8, 8],
    ],
    1,
    3,
    7,
    8
  )
);

console.log(
  solution(
    [
      [1, 1, 8, 4],
      [2, 2, 4, 9],
      [3, 6, 9, 8],
      [6, 3, 7, 7],
    ],
    9,
    7,
    6,
    1
  )
);

console.log(
  solution(
    [
      [1, 1, 2, 6],
      [3, 1, 4, 6],
      [0, 2, 5, 3],
      [0, 4, 5, 5],
    ],
    2,
    2,
    4,
    4
  )
);

console.log(
  solution(
    [
      [1, 1, 3, 7],
      [2, 2, 7, 4],
      [4, 3, 6, 6],
    ],
    1,
    2,
    6,
    6
  )
);

console.log(solution([[49, 49, 50, 50]], 50, 50, 49, 49));
