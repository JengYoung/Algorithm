class Queue {
  constructor() {
    this.queue = [];
    this.front = 0;
    this.rear = 0;
  }
  enqueue(val) {
    this.queue[this.rear] = val;
    this.rear += 1;
  }
  dequeue() {
    const value = this.queue[this.front];
    delete this.queue[this.front];
    this.front += 1;
    return value;
  }
  size() {
    return this.rear - this.front;
  }
}

const getDataset = (n, results) => {
  const winDataset = Array.from({ length: n }, () => new Array(n).fill(false));
  const loseDataset = Array.from({ length: n }, () => new Array(n).fill(false));
  results.forEach(([winPlayer, losePlayer]) => {
    winDataset[winPlayer - 1][losePlayer - 1] = true;
    loseDataset[losePlayer - 1][winPlayer - 1] = true;
  });
  return [winDataset, loseDataset];
};

const getVisitedByDataset = (now, dataset, visited) => {
  const queue = new Queue();
  visited[now] = true; // 자기를 제외했을 때 나머지가 결과를 추측 가능하면 이 친구는 순위 매길 수 O
  bfs(dataset[now], now);
  while (queue.size()) {
    const [winner, loser] = queue.dequeue();
    bfs(dataset[loser], winner);
  }

  return visited;

  function bfs(dataset, target) {
    dataset.forEach((isNext, idx) => {
      if (isNext && !visited[idx]) {
        // 기존에 데이터에서 체크된 결과인지 && 이미 체크되었는지와
        visited[idx] = true;
        queue.enqueue([target, idx]);
      }
    });
  }
};

const getResult = (n, winDataset, loseDataset) => {
  let result = 0;
  const makeVisited = () => Array.from({ length: n }, () => false); // 1 ~ n번까지의 경기 총 결과를 갖고 오기 위한 것.
  for (let now = 0; now < n; now += 1) {
    // 1 ~ n번까지의 결과를 체크
    const winVisited = getVisitedByDataset(now, winDataset, makeVisited()); // 1 2 3  1 -> 2  2 -> 3  -  1 -> 2  3 -> 2
    console.log(`${now + 1}번 선수의 이긴것만 했을 때의 결과: `, winVisited);
    const totalVisited = getVisitedByDataset(now, loseDataset, winVisited);
    console.log(`${now + 1}번 선수의 결과: `, totalVisited);
    result += totalVisited.every((bool) => bool);
  }
  return result;
};

const solution = (n, results) => {
  const [winDataset, loseDataset] = getDataset(n, results);
  const result = getResult(n, winDataset, loseDataset);

  return result;
};

const n = 5;
const results = [
  [4, 3],
  [4, 2],
  [3, 2],
  [1, 2],
  [2, 5],
];
console.log(solution(n, results));
