/**
 * @param {number[][]} points
 * @return {number}
 */

class MinHeap {
  constructor() {
    this.heap = [null];
    this.size = 0;
  }

  heappush(value) {
    this.heap.push(value);
    let nowIndex = this.heap.length - 1;
    let parentIndex = Math.floor(nowIndex / 2);
    while (nowIndex > 1 && this.heap[parentIndex][2] > this.heap[nowIndex][2]) {
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

    if (!this.heap[rightIndex]) {
      if (
        this.heap[leftIndex] &&
        this.heap[nowIndex][2] > this.heap[leftIndex][2]
      ) {
        this.swap(nowIndex, leftIndex);
        return returnValue;
      }
    }

    while (
      this.heap[rightIndex] &&
      (this.heap[nowIndex][2] > this.heap[leftIndex][2] ||
        this.heap[nowIndex][2] > this.heap[rightIndex][2])
    ) {
      if (this.heap[leftIndex][2] < this.heap[rightIndex][2]) {
        this.swap(nowIndex, leftIndex);
        nowIndex = leftIndex;
      } else {
        this.swap(nowIndex, rightIndex);
        nowIndex = rightIndex;
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

const calcDist = (x1, y1, x2, y2) => {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
};

const findParent = (x, parent) => {
  return parent[x] === x ? x : findParent(parent[x], parent);
};

const unionFind = (a, b, parent) => {
  const parentA = findParent(a, parent);
  const parentB = findParent(b, parent);

  if (parentA <= parentB) {
    parent[parentB] = parentA;
  } else {
    parent[parentA] = parentB;
  }
};

const minCostConnectPoints = (points) => {
  let total = 0;
  let cnt = 1;

  const minHeap = new MinHeap();

  for (let i = 0; i < points.length; i += 1) {
    const [x1, y1] = points[i];

    for (let j = i + 1; j < points.length; j += 1) {
      const [x2, y2] = points[j];

      minHeap.heappush([i, j, calcDist(x1, y1, x2, y2)]);
    }
  }

  const parent = Array.from({ length: points.length + 1 }, (_, idx) => idx);

  while (minHeap.size) {
    const [from, to, cost] = minHeap.heappop();

    if (findParent(from, parent) !== findParent(to, parent)) {
      unionFind(from, to, parent);
      total += cost;
      cnt += 1;

      if (cnt === points.length) break;
    }
  }

  return total;
};

(() => {
  const points = [
    [0, 0],
    [2, 2],
    [3, 10],
    [5, 2],
    [7, 0],
  ];
  console.log(minCostConnectPoints(points));
})();
