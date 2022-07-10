/*
    완전이진트리의 성질
    1. 왼쪽 자식의 index = 부모 index * 2
    2. 오른쪽 자식의 index = (부모 index * 2) + 1
    3. 부모의 index = Math.floor(자식의 인덱스 / 2);
*/
class MaxHeap {
  constructor() {
    this.heap = [null];
  }
  heappush(value) {
    this.heap.push(value);
    let nowIndex = this.heap.length - 1;
    let parentIndex = Math.floor(nowIndex / 2);
    while (nowIndex > 1 && this.heap[parentIndex] < this.heap[nowIndex]) {
      this.swap(nowIndex, parentIndex);
      nowIndex = parentIndex;
      parentIndex = Math.floor(nowIndex / 2);
    }
  }
  heappop() {
    const returnValue = this.heap[1];
    this.heap[1] = this.heap.pop();
    let nowIndex = 1;
    let leftIndex = 2;
    let rightIndex = 3;
    while (
      this.heap[nowIndex] < this.heap[leftIndex] ||
      this.heap[nowIndex] < this.heap[rightIndex]
    ) {
      if (this.heap[leftIndex] < this.heap[rightIndex]) {
        this.swap(nowIndex, rightIndex);
        nowIndex = rightIndex;
      } else {
        this.swap(nowIndex, leftIndex);
        nowIndex = leftIndex;
      }
      leftIndex = nowIndex * 2;
      rightIndex = nowIndex * 2 + 1;
    }
    return returnValue;
  }
  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }
}
const maxHeap = new MaxHeap();
maxHeap.heappush(300);
maxHeap.heappush(23);
maxHeap.heappush(19);
maxHeap.heappush(5);
maxHeap.heappush(8);
maxHeap.heappush(22);
maxHeap.heappush(1);
maxHeap.heappush(1);
maxHeap.heappush(29);
console.log(maxHeap.heap);

let maxVal = maxHeap.heappop();
console.log(maxVal);
maxVal = maxHeap.heappop();
console.log(maxVal);
maxVal = maxHeap.heappop();
console.log(maxVal);
maxVal = maxHeap.heappop();
console.log(maxVal);
maxVal = maxHeap.heappop();
console.log(maxVal);

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

let minVal = minHeap.heappop();
console.log(minVal);
minVal = minHeap.heappop();
console.log(minVal);
minVal = minHeap.heappop();
console.log(minVal);
minVal = minHeap.heappop();
console.log(minVal);
minVal = minHeap.heappop();
console.log(minVal);
