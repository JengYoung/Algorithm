class MaxHeap {
  constructor() {
    this.heap = [null];
  }
  heappush(val) {
    this.heap.push(val);
    let nowIdx = this.heap.length - 1;
    let parentIdx = this.updateParentIndex(nowIdx);
    while (nowIdx > 1 && this.heap[nowIdx] > this.heap[parentIdx]) {
      this.swap(nowIdx, parentIdx);
      nowIdx = parentIdx;
      parentIdx = this.updateParentIndex(nowIdx);
    }
  }
  heappop() {
    if (this.heap.length === 1) return;
    if (this.heap.length === 2) return this.heap.pop();
    const max = this.heap[1];
    this.heap[1] = this.heap.pop();
    let [nowIdx, leftIdx, rightIdx] = this.updateIndices(1);
    if (!this.heap[leftIdx]) return max;
    if (!this.heap[rightIdx]) {
      if (this.heap[leftIdx] > this.heap[nowIdx]) {
        this.swap(leftIdx, nowIdx);
      }
      return max;
    }
    while (
      Math.max(this.heap[leftIdx], this.heap[rightIdx]) > this.heap[nowIdx]
    ) {
      const maxIdx =
        this.heap[leftIdx] > this.heap[rightIdx] ? leftIdx : rightIdx;
      this.swap(nowIdx, maxIdx);
      [nowIdx, leftIdx, rightIdx] = this.updateIndices(maxIdx);
    }
    return max;
  }
  updateParentIndex(idx) {
    return Math.floor(idx / 2);
  }
  updateIndices(idx) {
    return [idx, idx * 2, idx * 2 + 1];
  }
  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }
}

const findKthLargest = function (nums, k) {
  const maxHeap = new MaxHeap();
  nums.forEach((num) => maxHeap.heappush(num));
  let i = 0;
  let result;
  while (i < k) {
    i += 1;
    result = maxHeap.heappop();
  }
  return result;
};

const nums = [3, 2, 3, 1, 2, 4, 5, 5, 6];
const k = 4;

console.log(findKthLargest(nums, k));
