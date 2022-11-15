// Run by Node.js
const readline = require('readline');

(async () => {
  let rl = readline.createInterface({ input: process.stdin });

  const inputs = [];

  rl.on('line', (line) => inputs.push(line.trim())).on('close', () => {
    main(inputs);
    process.exit();
  });
})();

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
  get length() {
    return this.rear - this.front;
  }
}

function main(inputs) {
  let result = 0;

  const positions = inputs[0].split(' ').map(Number);
  const board = [];

  for (let i = 1; i < inputs.length; i += 1) {
    board.push(inputs[i].split(' ').map(Number));
  }

  let directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  let nowBoard = JSON.parse(JSON.stringify(board));
  let flag = true;

  if (board.flat().every((v) => !v)) return 0;

  const check = (nx, ny, board) =>
    nx >= 0 && ny >= 0 && nx < board.length && ny < board[0].length;

  while (flag) {
    result += 1;

    const copiedBoard = JSON.parse(JSON.stringify(nowBoard));

    for (let x = 0; x < copiedBoard.length; x += 1) {
      for (let y = 0; y < copiedBoard[0].length; y += 1) {
        if (nowBoard[x][y] === 0) {
          for (const [dx, dy] of directions) {
            const nx = x + dx;
            const ny = y + dy;

            if (check(nx, ny, copiedBoard)) {
              copiedBoard[nx][ny] = 0;
            }
          }
        }
      }
    }

    if (copiedBoard.flat().every((v) => !v)) {
      result = -1;
      break;
    }

    const queue = new Queue();
    const visited = Array.from({ length: copiedBoard.length }, () =>
      new Array(copiedBoard[0].length).fill(false)
    );

    for (let i = 0; i < copiedBoard.length; i += 1) {
      for (let j = 0; j < copiedBoard[0].length; j += 1) {
        if (copiedBoard[i][j] === 0) {
          visited[i][j] = true;
        } else {
          if (!queue.length) queue.enqueue([i, j]);
        }
      }
    }

    while (queue.length) {
      const [nowX, nowY] = queue.dequeue();
      if (visited[nowX][nowY]) continue;
      visited[nowX][nowY] = true;

      for (let [dx, dy] of directions) {
        const nx = nowX + dx;
        const ny = nowY + dy;

        if (
          check(nx, ny, copiedBoard) &&
          copiedBoard[nx][ny] === 1 &&
          !visited[nx][ny]
        ) {
          queue.enqueue([nx, ny]);
        }
      }
    }

    if (!visited.flat().every((v) => v)) {
      break;
    }

    nowBoard = copiedBoard;
  }
  console.log(result);
}
