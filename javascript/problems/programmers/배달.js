class MinHeap {
  constructor() {
    this.heap = [null];
    this.size = 0;
  }
  heappush(value) {
    this.heap.push(value);
    let nowIndex = this.heap.length - 1;
    let parentIndex = Math.floor(nowIndex / 2);
    while (nowIndex > 1 && this.heap[parentIndex] > this.heap[nowIndex]) {
      this.swap(nowIndex, parentIndex);
      nowIndex = parentIndex;
      parentIndex = Math.floor(nowIndex / 2);
    }
    this.size += 1;
  }
  heappop() {
    const returnValue = this.heap[1];
    if (this.size === 1) {
      this.size -= 1;
      return this.heap.pop();
    }
    this.heap[1] = this.heap.pop();
    let nowIndex = 1;
    let leftIndex = nowIndex * 2;
    let rightIndex = nowIndex * 2 + 1;
    while (
      this.heap[nowIndex] > this.heap[leftIndex] ||
      this.heap[nowIndex] > this.heap[rightIndex]
    ) {
      if (this.heap[rightIndex] < this.heap[leftIndex]) {
        this.swap(nowIndex, rightIndex);
        nowIndex = rightIndex;
      } else {
        this.swap(nowIndex, leftIndex);
        nowIndex = leftIndex;
      }
      leftIndex = nowIndex * 2;
      rightIndex = nowIndex * 2 + 1;
    }
    this.size -= 1;
    return returnValue;
  }
  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }
}

const solution = (N, road, K) => {
  const start = 1;
  const graph = Array.from({ length: N + 1 }, () => []);
  road.forEach(([from, to, cost]) => {
    graph[from].push([to, cost]);
    graph[to].push([from, cost]);
  });

  const distance = new Array(N + 1).fill(Infinity);
  const minHeap = new MinHeap();
  minHeap.heappush([0, start]);
  distance[start] = 0;

  while (minHeap.size) {
    const [nowDist, now] = minHeap.heappop();
    if (distance[now] < nowDist) continue;
    for (const [nextCity, nextDist] of graph[now]) {
      let cost = nowDist + nextDist;
      if (cost < distance[nextCity]) {
        distance[nextCity] = cost;
        minHeap.heappush([cost, nextCity]);
      }
    }
  }
  return distance.filter((dist) => dist <= K).length;
};

const N = 6;

const road = [
  [1, 2, 1],
  [1, 3, 2],
  [2, 3, 2],
  [3, 4, 3],
  [3, 5, 2],
  [3, 5, 3],
  [5, 6, 1],
];

const K = 4;
console.log(solution(N, road, K));
