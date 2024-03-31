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

const MARK = {
  WATER: '0',
  LAND: '1',
};

const bfs = (queue, visible) => {
  const rowLength = visible.length;
  const colLength = visible[0].length;

  const directions = [
    [0, 1],
    [0, -1],
    [-1, 0],
    [1, 0],
  ];

  while (queue.size) {
    const [x, y] = queue.dequeue();

    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;

      if (
        nx < 0 ||
        ny < 0 ||
        nx >= rowLength ||
        ny >= colLength ||
        visible[nx][ny]
      ) {
        continue;
      }

      visible[nx][ny] = true;
      queue.enqueue([nx, ny]);
    }
  }
};

/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
  const visible = grid.map((row) => row.map((col) => col === MARK.WATER));

  const queue = new CustomQueue();

  let result = 0;

  grid.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      if (!visible[rowIndex][colIndex]) {
        result += 1;

        visible[rowIndex][colIndex] = true;
        queue.enqueue([rowIndex, colIndex]);

        bfs(queue, visible);
      }
    });
  });

  return result;
};
