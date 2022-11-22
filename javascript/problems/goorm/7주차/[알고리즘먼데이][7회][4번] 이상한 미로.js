// Run by Node.js
const readline = require('readline');

(async () => {
  let rl = readline.createInterface({ input: process.stdin });

  const inputs = [];

  rl.on('line', (line) => inputs.push(line)).on('close', () => {
    main(inputs);
    process.exit();
  });
})();

class MinHeap {
  constructor() {
    this.heap = [null];
  }

  heappush(value) {
    this.heap.push(value);
    let nowIndex = this.heap.length - 1;
    let parentIndex = Math.floor(nowIndex / 2);
    while (nowIndex > 1 && this.heap[parentIndex][1] > this.heap[nowIndex][1]) {
      this.swap(nowIndex, parentIndex);
      nowIndex = parentIndex;
      parentIndex = Math.floor(nowIndex / 2);
    }
  }

  heappop() {
    if (this.length === 1) return this.heap.pop();
    const returnValue = this.heap[1];
    this.heap[1] = this.heap.pop();

    let nowIndex = 1;
    let leftIndex = nowIndex * 2;
    let rightIndex = nowIndex * 2 + 1;

    if (!this.heap[rightIndex]) {
      if (
        this.heap[leftIndex] &&
        this.heap[nowIndex][1] > this.heap[leftIndex][1]
      ) {
        this.swap(nowIndex, leftIndex);
        return returnValue;
      }
    }

    while (
      this.heap[rightIndex] &&
      (this.heap[nowIndex][1] > this.heap[leftIndex][1] ||
        this.heap[nowIndex][1] > this.heap[rightIndex][1])
    ) {
      if (this.heap[leftIndex][1] < this.heap[rightIndex][1]) {
        this.swap(nowIndex, leftIndex);
        nowIndex = leftIndex;
      } else {
        this.swap(nowIndex, rightIndex);
        nowIndex = rightIndex;
      }

      leftIndex = nowIndex * 2;
      rightIndex = nowIndex * 2 + 1;
    }
    return returnValue;
  }

  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

  get length() {
    return this.heap.length - 1;
  }
}
function main(ips) {
  let result = -1;

  const [N, M] = ips[0].split(' ').map(Number);
  const A = [0, ...ips[1].split(' ').map(Number)];

  const graph = {};

  for (let i = 2; i < M + 2; i += 1) {
    const [a, b, c] = ips[i].split(' ').map(Number);

    graph[a] = [...(graph[a] ?? []), [b, c]];
    graph[b] = [...(graph[b] ?? []), [a, c]];
  }

  const distance = Array.from({ length: N + 1 }, () =>
    new Array(10).fill(Infinity)
  );

  const minHeap = new MinHeap();

  distance[1][0] = 0;

  minHeap.heappush([1, distance[1][0], 0]);

  while (minHeap.length) {
    const [now, cost, prev] = minHeap.heappop();
    if (cost > distance[now][prev]) continue;

    if (now === N) {
      result = cost;
      break;
    }

    for (const [next, nextCost] of graph[now] ?? []) {
      const totalCost = cost + nextCost;
      const nowRemainder = now % A[next];

      if (
        totalCost < distance[next][nowRemainder] &&
        (now === 1 || prev === next % A[now])
      ) {
        distance[next][nowRemainder] = totalCost;

        minHeap.heappush([next, totalCost, nowRemainder]);
      }
    }
  }
  console.log(result);
}
