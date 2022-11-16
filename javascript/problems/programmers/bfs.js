const makeBoard = (worldmap) => {
  return worldmap.map((v) => v.split(''));
};

class Queue {
  constructor() {
    this.queue = [];
    this.front = 0;
    this.rear = 0;
  }

  enqueue(value) {
    this.queue[this.rear] = value;

    this.rear += 1;
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

/*
 1. 방향 기억하기
 */

const LEFT = 'LEFT';
const RIGHT = 'RIGHT';
const UP = 'UP';
const DOWN = 'DOWN';

const Directions = {
  LEFT: [-1, 0],
  UP: [-1, 0],
  RIGHT: [0, 1],
  DOWN: [1, 0],
};

const nextDirections = {
  LEFT: [Directions[DOWN], Directions[UP]],
  UP: [Directions[LEFT], Directions[RIGHT]],
  RIGHT: [Directions[UP], Directions[DOWN]],
  DOWN: [Directions[RIGHT], Directions[LEFT]],
};

const nextDirectionNames = {
  LEFT: [DOWN, UP],
  UP: [LEFT, RIGHT],
  RIGHT: [UP, DOWN],
  DOWN: [RIGHT, LEFT],
};

function solution(worldmap) {
  const rowLength = worldmap.length;
  const colLength = worldmap[0].length;

  const board = makeBoard(worldmap);

  const visited = Array.from({ length: rowLength }, () =>
    Array.from({ length: rowLength }, () => ({
      LEFT: false,
      RIGHT: false,
      UP: false,
      DOWN: false,
    }))
  );

  const queue = new Queue();
  // x, y, time, direction,
  queue.enqueue([0, 0, 0, RIGHT, nextDirections[RIGHT]]);
  visited[0][0] = true;

  while (queue.length) {
    const [x, y, time, nowDirectionName, nextDirection] = queue.dequeue();
    if (x === rowLength - 1 && y === colLength - 1) {
      return time;
    }

    const nowDirection = Directions[nowDirectionName];

    const fx = x + nowDirection[0];
    const fy = y + nowDirection[1];

    if (
      fx >= 0 &&
      fy >= 0 &&
      fx < rowLength &&
      fy < colLength &&
      !board[fx][fy] !== 'X'
    ) {
      queue.enqueue([
        fx,
        fy,
        time + 1,
        nowDirectionName,
        nextDirections[nowDirectionName],
      ]);

      for (let i = 0; i < 2; i += 1) {
        const [dx, dy] = nextDirection[i];

        const nd = nextDirectionNames[nowDirectionName][i];
        const ndx = Directions[nd][0] + x;
        const ndy = Directions[nd][1] + y;

        if (
          ndx >= 0 &&
          ndy >= 0 &&
          ndx < rowLength &&
          ndy < colLength &&
          board[ndx][ndy] === 'X' &&
          visited[ndx][ndy][nd]
        )
          continue;

        const nx = fx + dx;
        const ny = fy + dy;

        if (
          nx >= 0 &&
          ny >= 0 &&
          nx < rowLength &&
          ny < colLength &&
          !visited[nx][ny] &&
          !board[nx][ny] !== 'X'
        ) {
          visited[nx][ny][nowDirectionName] = true;

          queue.enqueue([nx, ny, time + 1, nd, nextDirections[nd]]);
        }
      }
    }
  }
}

const worldmap = ['..XXX', '..XXX', '...XX', 'X....', 'XXX..'];
console.log(solution(worldmap));
