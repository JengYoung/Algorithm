const fs = require('fs');
const input = fs.readFileSync("나이트의이동.txt").toString().trim().split("\n");

class Queue {
  constructor() {
    this.queue = [];
    this.front = 0;
    this.rear = 0;
  }
  enqueue(data) {
    this.queue[this.rear] = data;
    this.rear += 1;
  }
  dequeue() {
    const popleft = this.queue[this.front];
    delete this.queue[this.front];
    this.front += 1;
    return popleft;
  }
  size() {
    return this.rear - this.front;
  }
}

const main = input => {
  let result = [];
  let inputIdx = 0;
  const cnt = input[inputIdx++];

  for (let i = 0; i < cnt; i++) {
    const boardSize = parseInt(input[inputIdx++]);
    const startXY = input[inputIdx++].trim().split(' ').map(val => parseInt(val));
    const destinationXY = input[inputIdx++].trim().split(' ').map(val => parseInt(val));
    result = [
        ...result, 
        getMinimizedMovement(boardSize, startXY, destinationXY)
    ]
  }
  result.forEach((minimizedMovement) => console.log(minimizedMovement));
}

const getMinimizedMovement = (boardSize, startXY, destinationXY) => {
  const visited = Array.from(new Array(boardSize), () => new Array(boardSize).fill(false));

  const [startX, startY] = startXY;
  const [destinationX, destinationY] = destinationXY;
  const nextDirections = [
    [2, 1], 
    [2, -1], 
    [1, 2], 
    [1, -2], 
    [-1, 2], 
    [-1, -2], 
    [-2, 1], 
    [-2, -1]
  ]

  const queue = new Queue();
  queue.enqueue([startX, startY, 0]);

  while (queue.size()) {
    const [x, y, moveCnt] = queue.dequeue();
    if (destinationX === x && destinationY === y) {
      return moveCnt;
    }
    nextDirections.forEach(([nextX, nextY]) => {
      const nx = x + nextX;
      const ny = y + nextY;
      if (nx >= 0 && ny >= 0 && nx < boardSize && ny < boardSize && !visited[nx][ny]) {
        visited[nx][ny] = true;
        queue.enqueue([nx, ny, moveCnt + 1]);
      }
    })
  }
}

main(input);