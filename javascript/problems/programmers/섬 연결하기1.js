class MinHeap {
  constructor() {
    this.heap = [null];
    this.size = 0;
  }
  heappush(val) {
    this.heap.push(val);
    let nowIndex = this.heap.length - 1;
    let parentIndex = this.updateParentIndex(nowIndex);
    while (nowIndex > 1 && this.heap[nowIndex][0] < this.heap[parentIndex][0]) {
      this.swap(nowIndex, parentIndex);
      nowIndex = parentIndex;
      parentIndex = this.updateParentIndex(nowIndex);
    }
    this.size += 1;
  }
  heappop() {
    const min = this.heap[1];
    this.heap[1] = this.heap.pop();
    let [nowIndex, leftIndex, rightIndex] = this.updateIndices(1);
    while (
      this.heap[rightIndex] &&
      this.heap[nowIndex][0] >
        Math.min(this.heap[leftIndex][0], this.heap[rightIndex][0])
    ) {
      const minIndex =
        this.heap[leftIndex][0] < this.heap[rightIndex][0]
          ? leftIndex
          : rightIndex;
      this.swap(nowIndex, minIndex);
      [nowIndex, leftIndex, rightIndex] = this.updateIndices(minIndex);
    }

    this.size -= 1;
    return min;
  }

  updateParentIndex(nowIndex) {
    return Math.floor(nowIndex / 2);
  }
  updateIndices(nowIndex) {
    return [nowIndex, nowIndex * 2, nowIndex * 2 + 1];
  }
  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }
}

const findParent = (x, parent) => {
  return parent[x] === x ? x : findParent(parent[x], parent);
};

const updateParent = (a, b, parent) => {
  const parentA = findParent(a, parent);
  const parentB = findParent(b, parent);
  if (parent[parentA] <= parent[parentB]) {
    parent[parentB] = parent[parentA];
  } else parent[parentA] = parent[parentB];
};

const solution = (n, costs) => {
  let result = 0;
  let cnt = 1;
  const minHeap = new MinHeap();
  const parent = Array.from({ length: n }, (_, idx) => idx); // 부모 인덱스 판단
  costs.forEach(([from, to, cost]) => minHeap.heappush([cost, from, to]));
  while (minHeap.size) {
    const [cost, from, to] = minHeap.heappop();
    if (findParent(from, parent) !== findParent(to, parent)) {
      updateParent(from, to, parent);
      cnt += 1;
      result += cost;
      if (cnt === n) break;
    }
  }
  return result;
};

const n = 1;
const costs = [[1, 1, 2]];

console.log(solution(n, costs));
