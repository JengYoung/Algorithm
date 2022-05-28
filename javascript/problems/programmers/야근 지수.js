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

  getLength() {
    return this.heap.length - 1;
  }
}

const solution = (n, works) => {
  let answer = 0;
  const maxHeap = new MaxHeap();

  works.forEach((work) => maxHeap.heappush(work));

  let maxFatigue = maxHeap.heappop();
  let poppedWorksCount = 1;

  while (maxHeap.head() && n > 0) {
    const nowFatigue = maxHeap.heappop();

    if (maxFatigue === nowFatigue) {
      poppedWorksCount += 1;
    } else {
      const diff = maxFatigue - nowFatigue;
      if (diff * poppedWorksCount > n) {
        maxHeap.heappush(nowFatigue);
        break;
      }

      n -= poppedWorksCount * diff;

      poppedWorksCount += 1;
      maxFatigue = nowFatigue;
    }
  }

  if (!maxHeap.head() && n) {
    // return 0;
  }
  if (n) {
    const quotient = parseInt(n / poppedWorksCount);
    const remainder = n % poppedWorksCount;

    maxFatigue -= quotient;
    if (maxFatigue < 0) return 0;

    answer += Math.pow(maxFatigue, 2) * (poppedWorksCount - remainder);
    answer += Math.pow(maxFatigue - 1, 2) * remainder;
  } else {
    answer += Math.pow(maxFatigue, 2) * poppedWorksCount;
  }

  if (maxHeap.head()) {
    answer += maxHeap.heap.reduce((acc, cur) => acc + Math.pow(cur || 0, 2), 0);
  }

  return answer;
};

console.log(solution(4, [4, 3, 3]));
console.log('----------------------');
console.log(solution(1, [2, 1, 2]));
console.log('----------------------');
console.log(solution(3, [1, 1]));
console.log('----------------------');
console.log(solution(21, [22, 1]));
console.log('-----------------------');
console.log(solution(25, [3, 2, 4, 7, 8]));
console.log('-----------------------');
console.log(solution(163, [110, 10, 10, 10, 9, 8, 7, 6, 2, 1]));
// 100 - 104 - 109 - 115 - 122 - 154
