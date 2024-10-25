class MaxHeap {
  constructor() {
    this.heap = [null];
  }

  heappush(value) {
    this.heap.push(value);
    let nowIndex = this.heap.length - 1;
    let parentIndex = Math.floor(nowIndex / 2);
    while (nowIndex > 1 && this.heap[parentIndex][1] < this.heap[nowIndex][1]) {
      this.swap(nowIndex, parentIndex);
      nowIndex = parentIndex;
      parentIndex = Math.floor(nowIndex / 2);
    }
  }

  heappop() {
    if (this.length === 1) return this.heap.pop();
    const returnValue = this.heap[1];
    this.heap[1] = this.heap.pop();

    let nowIndex = 1;
    let leftIndex = nowIndex * 2;
    let rightIndex = nowIndex * 2 + 1;

    if (!this.heap[rightIndex]) {
      if (
        this.heap[leftIndex] &&
        this.heap[nowIndex][1] < this.heap[leftIndex][1]
      ) {
        this.swap(nowIndex, leftIndex);
        return returnValue;
      }
    }

    while (
      this.heap[rightIndex] &&
      (this.heap[nowIndex][1] < this.heap[leftIndex][1] ||
        this.heap[nowIndex][1] < this.heap[rightIndex][1])
    ) {
      if (this.heap[leftIndex][1] > this.heap[rightIndex][1]) {
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
 * @param {character[]} tasks
 * @param {number} n
 * @return {number}
 */
var leastInterval = function (tasks, n) {
  const maxHeap = new MaxHeap();
  const map = new Map();

  let result = 0;

  tasks.forEach((task) => {
    map.set(task, {
      count: (map.get(task)?.count ?? 0) + 1,
      waitTime: 0,
    });
  });

  [...map.entries()].forEach(([key, value]) => {
    maxHeap.heappush([key, value.count, value.waitTime]);
  });

  while (maxHeap.length) {
    let isReady = true;
    let temp = [];

    const heapSize = maxHeap.length;

    for (let i = 0; i < heapSize; i += 1) {
      const [key, count, waitTime] = maxHeap.heappop();

      if (waitTime) {
        temp.push([key, count, waitTime - 1]);
        continue;
      }

      if (isReady) {
        result += 1;

        isReady = false;

        const nextCount = count - 1;

        if (nextCount) {
          temp.push([key, nextCount, n]);
        }
      } else {
        temp.push([key, count, waitTime]);
      }
    }

    if (isReady) {
      result += 1;
    }

    temp.forEach((val) => maxHeap.heappush(val));
  }

  return result;
};
