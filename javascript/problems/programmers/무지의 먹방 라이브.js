class MinHeap {
  constructor() {
    this.heap = [null];
  }

  heappush(val) {
    this.heap.push(val);

    let nowIndex = this.heap.length - 1;
    let parentIndex = Math.floor(nowIndex / 2);

    while (nowIndex > 1 && this.heap[nowIndex][1] < this.heap[parentIndex][1]) {
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
      if (this.heap[leftIndex][1] < this.heap[nowIndex][1]) {
        this.swap(nowIndex, leftIndex);
        return min;
      }
    }

    while (this.heap[leftIndex] && this.heap[rightIndex] && Math.min(this.heap[leftIndex][1], this.heap[rightIndex][1]) < this.heap[nowIndex][1]) {
      const minIndex = this.heap[leftIndex][1] < this.heap[rightIndex][1] ? leftIndex : rightIndex;
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

  getHead() {
    return this.heap[1] ?? null
  }

  size() {
    return this.heap.length - 1;
  }
}

const solution = (food_times, k) => {
  const minHeap = new MinHeap();
  const numbers = new Map(); // 남은 음식 번호들 

  for (let i = 0; i < food_times.length; i += 1) {
    const num = i + 1;

    minHeap.heappush([num, food_times[i]]); // [음식 번호, 음식 시간]
    numbers.set(num, undefined);
  }

  let total = 0; // 지금까지의 총시간
  let last = 0; // 내가 이전에 먹었던 시간
  let now = minHeap.getHead() ? minHeap.getHead()[1] : null; // 다음에(이제) 먹을 시간
  if (now === null) return -1; // 예외처리

  let remainFoodCount = numbers.size; // length

  while (total + (now - last) * remainFoodCount <= k) { // [1000000, 2000000, 3000000] [1, 1000000] 1000000 * 3
    const [nowFoodNum, nowFoodTime] = minHeap.heappop();
    total += (nowFoodTime - last) * remainFoodCount;
    
    numbers.delete(nowFoodNum);
    remainFoodCount -= 1;

    last = nowFoodTime;
    
    if (minHeap.getHead()) {
      now = minHeap.getHead()[1]
    } else {
      break;
    }
  }

  if (!numbers.size) return -1;
  return [...numbers.keys()][(k - total) % numbers.size]; // (남은 시간 % 내가 지금 이 만큼의 음식 개수 -> 현재 n개의 음식이 남았는데 구해야할 음식이 뭔지!)
}

(() => {
  const food_times = [3, 1, 2];	
  const k = 5;

  console.log(solution(food_times, k))
})();
