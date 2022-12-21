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

  get length() {
    return this.size;
  }

  get min() {
    return this.heap[1];
  }
}

function solution(n, k, enemy) {
  let result = 0;

  let nCount = n;
  let kCount = k;

  const powerOverWhelming = new MinHeap();

  enemy.forEach((e) => {
    if (nCount < 0) return;

    if (kCount) {
      kCount -= 1;
      powerOverWhelming.heappush(e);
    } else {
      if (powerOverWhelming.length) {
        if (powerOverWhelming.min < e) {
          const diff = e - powerOverWhelming.heappop();
          powerOverWhelming.heappush(e);

          nCount -= diff;
          if (nCount < 0) return;
        } else {
          nCount -= e;
          if (nCount < 0) return;
        }
      }
    }

    result += 1;
  });

  return result;
}

console.log(solution(7, 3, [4, 2, 4, 5, 3, 3, 1])); // 5
console.log(solution(2, 4, [3, 3, 3, 3])); // 4
console.log(solution(2, 1, [3, 3])); // 4
