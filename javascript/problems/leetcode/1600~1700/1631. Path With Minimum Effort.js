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

const minimumEffortPath = (heights) => {
  const minHeap = new MinHeap();
  const xLength = heights.length;
  const yLength = heights[0].length;

  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  const dp = [];
  for (let i = 0; i < xLength; i += 1) {
    dp.push(JSON.parse(JSON.stringify(new Array(yLength).fill(1000000))));
  }

  dp[0][0] = 0;

  minHeap.heappush([0, 0, 0]);

  while (minHeap.heap.length > 1) {
    const [x, y, effort] = minHeap.heappop();
    for (let i = 0; i < 4; i += 1) {
      const [dx, dy] = directions[i];
      const nx = x + dx;
      const ny = y + dy;
      if (nx >= 0 && nx < xLength && ny >= 0 && ny < yLength) {
        const nowEffort = Math.abs(heights[nx][ny] - heights[x][y]);
        const nextEffort = Math.max(effort, nowEffort);
        if (dp[nx][ny] > nextEffort) {
          dp[nx][ny] = nextEffort;
          minHeap.heappush([nx, ny, nextEffort]);
        }
      }
    }
  }

  return dp[xLength - 1][yLength - 1];
};

(() => {
  const heights = [
    [1, 2, 1, 1, 1],
    [1, 2, 1, 2, 1],
    [1, 2, 1, 2, 1],
    [1, 2, 1, 2, 1],
    [1, 1, 1, 2, 1],
  ];
  // console.log(minimumEffortPath(heights), "expected: ", 0);
})();
(() => {
  const heights = [[1, 10, 6, 7, 9, 10, 4, 9]];
  // console.log(minimumEffortPath(heights));
})();

(() => {
  const heights = [
    [10, 8],
    [10, 8],
    [1, 2],
    [10, 3],
    [1, 3],
    [6, 3],
    [5, 2],
  ];
  console.log(minimumEffortPath(heights));
})();
