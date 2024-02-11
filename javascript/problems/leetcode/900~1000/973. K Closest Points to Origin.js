class MinHeap {
  constructor(standardIndex) {
    this.heap = [null];
    this.sortStandardIndex = standardIndex;
  }

  heappush(value) {
    this.heap.push(value);
    let nowIndex = this.heap.length - 1;
    let parentIndex = Math.floor(nowIndex / 2);
    while (
      nowIndex > 1 &&
      this.heap[parentIndex][this.sortStandardIndex] >
        this.heap[nowIndex][this.sortStandardIndex]
    ) {
      this.swap(nowIndex, parentIndex);
      nowIndex = parentIndex;
      parentIndex = Math.floor(nowIndex / 2);
    }
  }

  heappop() {
    if (this.length === 1) return this.heap.pop();
    const returnValue = this.heap[1];
    this.heap[this.sortStandardIndex] = this.heap.pop();

    let nowIndex = 1;
    let leftIndex = nowIndex * 2;
    let rightIndex = nowIndex * 2 + 1;

    if (!this.heap[rightIndex]) {
      if (
        this.heap[leftIndex] &&
        this.heap[nowIndex][this.sortStandardIndex] >
          this.heap[leftIndex][this.sortStandardIndex]
      ) {
        this.swap(nowIndex, leftIndex);
        return returnValue;
      }
    }

    while (
      this.heap[rightIndex] &&
      (this.heap[nowIndex][this.sortStandardIndex] >
        this.heap[leftIndex][this.sortStandardIndex] ||
        this.heap[nowIndex][this.sortStandardIndex] >
          this.heap[rightIndex][this.sortStandardIndex])
    ) {
      if (
        this.heap[leftIndex][this.sortStandardIndex] <
        this.heap[rightIndex][this.sortStandardIndex]
      ) {
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

/**
 * @param {number[][]} points
 * @param {number} k
 * @return {number[][]}
 */
var kClosest = function (points, k) {
  const minHeap = new MinHeap(1);

  points.forEach(([x, y]) => {
    const dist = Math.pow(x, 2) + Math.pow(y, 2);
    minHeap.heappush([[x, y], dist]);
  });

  const res = [];

  for (let i = 0; i < k; i += 1) {
    const now = minHeap.heappop();
    res.push(now[0]);
  }

  return res;
};
