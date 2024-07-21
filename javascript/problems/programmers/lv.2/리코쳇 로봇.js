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

  get peek() {
    return this.queue[this.front];
  }
  get size() {
    return this.rear - this.front;
  }
}

const directions = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

const solution = (board) => {
  const queue = new Queue();

  const startAt = [-1, -1];
  const endAt = [-1, -1];

  const grid = board.map((b) => [...b]);

  const rowSize = grid.length;
  const colSize = grid[0].length;

  const visited = board.map((b, rowIndex) =>
    [...b].map((v, colIndex) => {
      if (v === 'R') {
        startAt[0] = rowIndex;
        startAt[1] = colIndex;
      }

      if (v === 'G') {
        endAt[0] = rowIndex;
        endAt[1] = colIndex;
      }

      return ['R', 'G', '.'].includes(v) ? false : true;
    })
  );

  queue.enqueue([...startAt, 0]);

  while (queue.size) {
    const [row, col, cnt] = queue.dequeue();

    if (visited[row][col]) {
      continue;
    }

    if (row === endAt[0] && col === endAt[1]) {
      return cnt;
    }

    visited[row][col] = true;

    const check = (grid, nrow, ncol) => {
      return (
        nrow >= 0 &&
        nrow < rowSize &&
        ncol >= 0 &&
        ncol < colSize &&
        grid[nrow][ncol] !== 'D'
      );
    };

    for (const [drow, dcol] of directions) {
      let nrow = row;
      let ncol = col;

      inner: while (check(grid, nrow, ncol)) {
        const nextRow = nrow + drow;
        const nextCol = ncol + dcol;

        if (!check(grid, nextRow, nextCol)) {
          break inner;
        }

        nrow = nextRow;
        ncol = nextCol;
      }

      if (visited[nrow][ncol]) {
        continue;
      }

      queue.enqueue([nrow, ncol, cnt + 1]);
    }
  }

  return -1;
};
