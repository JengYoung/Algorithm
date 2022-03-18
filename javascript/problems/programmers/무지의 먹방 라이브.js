class MinHeap {
  constructor() {
    this.heap = [null];
  }

  heappush(val) {
    this.heap.push(val);

    let nowIndex = this.heap.length - 1;
    let parentIndex = Math.floor(nowIndex / 2);

    while (nowIndex > 1 && this.heap[nowIndex] < this.heap[parentIndex]) {
      this.swap(nowIndex, parentIndex);
      nowIndex = parentIndex;
      parentIndex = Math.floor(parentIndex / 2);
    }
  }

  heappop() {
    if (this.heap.length === 1) {
      return null;
    }
    if (this.heap.length === 2) {
      return this.heap.pop();
    }

    const min = this.heap[1];

    this.heap[1] = this.heap.pop();
    let nowIndex = 1;
    let leftIndex = nowIndex * 2;
    let rightIndex = nowIndex * 2 + 1;

    if (this.heap[leftIndex] === undefined) {
      return min;
    }
    if (this.heap[rightIndex] === undefined) {
      if (this.heap[leftIndex] < this.heap[nowIndex]) {
        this.swap(nowIndex, leftIndex);
        return min;
      }
    }

    while (Math.min(this.heap[leftIndex], this.heap[rightIndex]) < this.heap[nowIndex]) {
      const minIndex = this.heap[leftIndex] < this.heap[rightIndex] ? leftIndex : rightIndex;
      this.swap(minIndex, nowIndex);

      nowIndex = minIndex;
      leftIndex = nowIndex * 2;
      rightIndex = nowIndex * 2 + 1;
    }

    return min;
  }

  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]]
  }
}

const solution = (food_times, k) => {
  const minHeap = new MinHeap();
  minHeap.heappush(23);
  minHeap.heappush(19);
  minHeap.heappush(5);
  minHeap.heappush(8);
  minHeap.heappush(22);
  minHeap.heappush(1);
  minHeap.heappush(1);
  minHeap.heappush(29);
  console.log(minHeap.heap);
  console.log(minHeap.heappop())
  console.log(minHeap.heappop())
  console.log(minHeap.heappop())
  console.log(minHeap.heappop())
  console.log(minHeap.heappop())
  console.log(minHeap.heappop())
  console.log(minHeap.heappop())
  console.log(minHeap.heappop())
}

(() => {
  const food_times = [3, 1, 2];	
  const k = 5;

  console.log(solution(food_times, k))
})();