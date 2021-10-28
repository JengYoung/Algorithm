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

// 인접행렬 방식으로 구하기
const INF = Infinity;
const arr = [
  [0, 2, 5, 1, 0, 0],
  [2, 0, 3, 2, 0, 0],
  [5, 3, 0, 3, 1, 5],
  [1, 2, 3, 0, 1, 0],
  [0, 0, 1, 1, 0, 2],
  [0, 0, 5, 0, 2, 0],
];

const graph = Array.from({ length: arr.length }, () => []);
for (let i = 0; i < arr.length; i += 1) {
  arr[i].forEach((val, idx) => {
    if (i != idx && val > 0) graph[i].push([idx, val]);
  });
}

const dijkstra = (start) => {
  const distance = new Array(arr.length).fill(INF);
  const minHeap = new MinHeap();
  minHeap.heappush([0, start - 1]);
  distance[start - 1] = 0;
  while (minHeap.size) {
    const [nowDist, now] = minHeap.heappop();
    if (distance[now] < nowDist) continue;
    for (const [nextIdx, nextDist] of graph[now]) {
      let cost = nowDist + nextDist;
      if (cost < distance[nextIdx]) {
        distance[nextIdx] = cost;
        minHeap.heappush([cost, nextIdx]);
      }
    }
  }
  return distance[start - 1];
};
console.log(dijkstra(1));
