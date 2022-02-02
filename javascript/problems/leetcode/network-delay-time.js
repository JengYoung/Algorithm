class MinHeap {
  constructor() {
    this.heap = [null];
  }

  heappush(val) {
    this.heap.push(val);
    let nowIndex = this.heap.length - 1;
    let parentIndex = this.getParentIndex(nowIndex);

    while (nowIndex > 1 && this.heap[nowIndex][1] < this.heap[parentIndex][1]) {
      this.swap(nowIndex, parentIndex);
      nowIndex = parentIndex;
      parentIndex = this.getParentIndex(nowIndex);
    }
  }

  heappop() {
    if (this.heap.length === 1) return;
    if (this.heap.length === 2) return this.heap.pop();

    const min = this.heap[1];
    this.heap[1] = this.heap.pop();

    let [nowIndex, leftIndex, rightIndex] = this.getUpdatedindices(1);

    if (leftIndex > this.heap.length - 1) {
      return min;
    }
    if (
      rightIndex > this.heap.length - 1 &&
      this.heap[leftIndex][1] < this.heap[nowIndex][1]
    ) {
      this.swap(nowIndex, leftIndex);
      return min;
    }

    while (
      leftIndex < this.heap.length - 1 &&
      rightIndex < this.heap.length &&
      (this.heap[leftIndex][1] < this.heap[nowIndex][1] ||
        this.heap[nowIndex][1] < this.heap[leftIndex][1])
    ) {
      const minIndex =
        this.heap[rightIndex][1] < this.heap[leftIndex][1]
          ? leftIndex
          : rightIndex;
      this.swap(minIndex, nowIndex);
      [nowIndex, leftIndex, rightIndex] = this.getUpdatedindices(minIndex);
    }

    return min;
  }

  getParentIndex(index) {
    return Math.floor(index / 2);
  }

  getUpdatedindices(index) {
    return [index, index * 2, index * 2 + 1];
  }

  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }
}

const networkDelayTime = (times, n, k) => {
  const minHeap = new MinHeap();

  const graph = {};
  const distance = new Array(n).fill(Infinity);

  times.forEach(([from, to, cost]) => {
    if (graph[from] === undefined) graph[from] = [];
    if (graph[to] === undefined) graph[to] = [];
    graph[from].push([to, parseInt(cost)]);
  });
  const start = k;
  distance[start - 1] = 0;

  minHeap.heappush([0, start]);

  while (minHeap.heap.length > 1) {
    const [dist, now] = minHeap.heappop();
    for (const [to, cost] of graph[now]) {
      let nextDist = dist + cost;
      if (nextDist < distance[to - 1]) {
        distance[to - 1] = nextDist;
        minHeap.heappush([nextDist, to]);
      }
    }
  }
  const result = Math.max(...distance);
  return result !== Infinity ? result : -1;
};

const times = [
  [3, 5, 78],
  [2, 1, 1],
  [1, 3, 0],
  [4, 3, 59],
  [5, 3, 85],
  [5, 2, 22],
  [2, 4, 23],
  [1, 4, 43],
  [4, 5, 75],
  [5, 1, 15],
  [1, 5, 91],
  [4, 1, 16],
  [3, 2, 98],
  [3, 4, 22],
  [5, 4, 31],
  [1, 2, 0],
  [2, 5, 4],
  [4, 2, 51],
  [3, 1, 36],
  [2, 3, 59],
];
const n = 5;
const k = 5;

console.log(networkDelayTime(times, n, k));
