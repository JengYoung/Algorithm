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
  peek() {
    return this.queue[this.front];
  }
  size() {
    return this.rear - this.front;
  }
}

const directions = [
  [0, -1],
  [0, 1],
  [1, 0],
  [-1, 0],
];

/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
var updateMatrix = function (mat) {
  const res = JSON.parse(JSON.stringify(mat));
  const queue = new CustomQueue();
  const visited = JSON.parse(JSON.stringify(mat));

  for (let row = 0; row < mat.length; row += 1) {
    for (let col = 0; col < mat[0].length; col += 1) {
      res[row][col] = 0;
      visited[row][col] = false;

      if (mat[row][col] === 0) {
        queue.enqueue([row, col, 0]);
      }
    }
  }

  while (queue.size()) {
    const [r, c, cnt] = queue.dequeue();

    visited[r][c] = true; // visited

    for (const [dr, dc] of directions) {
      const nr = r + dr;
      const nc = c + dc;

      if (
        nr >= 0 &&
        nc >= 0 &&
        nr < mat.length &&
        nc < mat[0].length &&
        !visited[nr][nc]
      ) {
        if (mat[nr][nc] === 1) {
          visited[nr][nc] = true;
          res[nr][nc] = cnt + 1;
        }

        queue.enqueue([nr, nc, cnt + 1]);
      }
    }
  }

  return res;
};
