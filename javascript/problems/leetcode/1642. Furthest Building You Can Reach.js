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

var furthestBuilding = function (heights, bricks, ladders) {
  const arr = new MinHeap();
  let prev = heights[0];
  let cnt = 0;
  for (let i = 1; i < heights.length; i += 1) {
    const now = heights[i];

    if (now > prev) {
      arr.heappush(now - prev);

      if (ladders) {
        ladders -= 1;
      } else {
        bricks -= arr.heappop();
      }
    }

    if (bricks < 0) return cnt;

    prev = heights[i];
    cnt += 1;
  }

  return cnt;
};

console.log(furthestBuilding([4, 12, 2, 7, 3, 18, 20, 3, 19], 10, 2));
