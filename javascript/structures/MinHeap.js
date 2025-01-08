class MinHeap {
  constructor() {
    this.items = [];
  }

  size() {
    return this.items.length;
  }

  push(value) {
    this.items.push(value);
    this.bubbleUp();
  }

  pop() {
    if (!this.size()) {
      return null;
    }

    const min = this.items[0];

    this.items[0] = this.items[this.size() - 1];
    this.items.pop();

    this.bubbleDown();

    return min;
  }

  swap(a, b) {
    [this.items[a], this.items[b]] = [this.items[b], this.items[a]];
  }

  bubbleUp() {
    let index = this.size() - 1;

    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);

      if (this.items[parentIndex][0] <= this.items[index][0]) {
        break;
      }

      this.swap(index, parentIndex);
      index = parentIndex;
    }
  }

  bubbleDown() {
    let index = 0;

    while (index * 2 + 1 < this.size()) {
      const leftIndex = index * 2 + 1;
      const rightIndex = index * 2 + 2;

      const isRightBiggerThanLeft =
        rightIndex < this.size() &&
        this.items[rightIndex][0] < this.items[leftIndex][0];

      const minIndex = isRightBiggerThanLeft ? rightIndex : leftIndex;

      if (this.items[index][0] <= this.items[minIndex][0]) {
        break;
      }

      this.swap(index, minIndex);
      index = minIndex;
    }
  }
}

const heap = new MinHeap();

heap.push([100]);
heap.push([3]);
heap.push([10]);
heap.push([5]);
heap.push([7]);
heap.push([-1]);
heap.push([0]);
heap.push([8]);

while (heap.size()) {
  console.log(heap.pop());
}
