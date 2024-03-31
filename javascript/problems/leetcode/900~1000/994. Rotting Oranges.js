class CustomQueue {
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

/**
 * @param {number[][]} grid
 * @return {number}
 */

const STATUS = {
  EMPTY: 0,
  FRESH: 1,
  ROTTEN: 2,
};

const directions = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

var orangesRotting = function (grid) {
  let result = 0;
  const queue = new CustomQueue();

  const visible = grid.map((row, rowIndex) =>
    row.map((col, colIndex) => {
      if (col === STATUS.ROTTEN) {
        queue.enqueue([rowIndex, colIndex]);
      }

      return [STATUS.EMPTY, STATUS.ROTTEN].includes(col);
    })
  );

  while (queue.size) {
    const nextQueue = [];

    const queueSize = queue.size;

    for (let i = 0; i < queueSize; i += 1) {
      const [x, y] = queue.dequeue();

      visible[x][y] = true;

      for (const [dx, dy] of directions) {
        const nx = x + dx;
        const ny = y + dy;

        if (
          nx >= 0 &&
          ny >= 0 &&
          nx < visible.length &&
          ny < visible[0].length &&
          !visible[nx][ny]
        ) {
          visible[nx][ny] = true;
          nextQueue.push([nx, ny]);
        }
      }
    }

    if (nextQueue.length) {
      result += 1;
    }

    nextQueue.forEach((next) => {
      queue.enqueue(next);
    });
  }

  return visible.every((row) => row.every((col) => Boolean(col))) ? result : -1;
};
