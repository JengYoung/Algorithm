// Run by Node.js
const readline = require('readline');

(async () => {
  let rl = readline.createInterface({ input: process.stdin });
  const inputs = [];

  rl.on('line', (line) => inputs.push(line)).on('close', () => {
    main(+inputs[0], inputs[1].trim().split(' ').map(Number));
    process.exit();
  });
})();

class MaxHeap {
  constructor() {
    this.heap = [null];
  }

  heappush(val) {
    this.heap.push(val);

    let nowIndex = this.heap.length - 1;
    let parentIndex = Math.floor(nowIndex / 2);

    while (nowIndex > 1 && this.heap[nowIndex] > this.heap[parentIndex]) {
      this.swap(nowIndex, parentIndex);

      nowIndex = parentIndex;
      parentIndex = Math.floor(nowIndex / 2);
    }
  }

  heappop() {
    if (this.heap.length === 1) return;
    if (this.heap.length === 2) return this.heap.pop();

    const min = this.heap[1];
    this.heap[1] = this.heap.pop();

    let [nowIndex, leftIndex, rightIndex] = [1, 2, 3];

    if (this.heap[leftIndex] === undefined) {
      return min;
    }

    if (this.heap[rightIndex] === undefined) {
      if (this.heap[leftIndex] > this.heap[nowIndex]) {
        this.swap(leftIndex, nowIndex);

        return min;
      }
    }

    while (
      this.heap[leftIndex] > this.heap[nowIndex] ||
      this.heap[rightIndex] > this.heap[nowIndex]
    ) {
      const minIndex =
        this.heap[leftIndex] < this.heap[rightIndex] ? rightIndex : leftIndex;

      this.swap(nowIndex, minIndex);

      nowIndex = minIndex;
      leftIndex = nowIndex * 2;
      rightIndex = nowIndex * 2 + 1;
    }

    return min;
  }

  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

  head() {
    return this.heap[1];
  }

  get length() {
    return this.heap.length - 1;
  }
}

function main(N, A) {
  let total = BigInt(0);

  const map = new Map();
  const maxHeap = new MaxHeap();

  A.forEach((v) => {
    if (map.has(v)) {
      map.delete(v);

      maxHeap.heappush(v);
    } else {
      map.set(v, 1);
    }
  });

  while (maxHeap.length >= 2) {
    const a = maxHeap.heappop();
    const b = maxHeap.heappop();

    total += BigInt(a * b);
  }

  console.log(total.toString());
}
