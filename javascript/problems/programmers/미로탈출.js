class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;

    this.size = 0;
  }

  push(data) {
    const newNode = new Node(data);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.size += 1;
  }

  pop() {
    if (!this.head) {
      return null;
    }

    const removeNode = this.head;
    this.head = this.head.next;

    if (!this.head) {
      this.tail = null;
    }

    this.size -= 1;

    return removeNode.data;
  }

  isEmpty() {
    return this.size === 0;
  }
}

const directions = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

function solution(maps) {
  const rowLength = maps.length;
  const colLength = maps[0].length;

  let start = [0, 0];
  let end = [0, 0];
  let mid = [0, 0];

  maps.forEach((_, r) =>
    [..._].forEach((v, c) => {
      if (v === 'S') {
        start = [r, c];
      }

      if (v === 'E') {
        end = [r, c];
      }

      if (v === 'L') {
        mid = [r, c];
      }
    })
  );

  const bfs = (from, to) => {
    const visited = maps.map((_) =>
      [..._].map((v) => {
        return v === 'X' ? true : false;
      })
    );

    const queue = new Queue();

    const [fromRow, fromCol] = from;
    const [toRow, toCol] = to;

    queue.push([fromRow, fromCol, 0]);

    while (!queue.isEmpty()) {
      const [row, col, cnt] = queue.pop();

      visited[row][col] = true;

      if (row === toRow && col === toCol) {
        return cnt;
      }

      for (const [drow, dcol] of directions) {
        const nrow = row + drow;
        const ncol = col + dcol;

        if (
          nrow < 0 ||
          ncol < 0 ||
          nrow >= rowLength ||
          ncol >= colLength ||
          visited[nrow][ncol]
        ) {
          continue;
        }

        queue.push([nrow, ncol, cnt + 1]);
      }
    }

    return -1;
  };

  const leverCnt = bfs(start, mid);

  if (leverCnt === -1) {
    return -1;
  }

  const endCnt = bfs(mid, end);

  if (endCnt === -1) {
    return -1;
  }

  return leverCnt + endCnt;
}

console.log(solution(['SOOOL', 'XXXXO', 'OOOOO', 'OXXXX', 'OOOOE']));
