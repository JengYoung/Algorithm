class MinHeap {
  constructor() {
    this.heap = [null];
  }

  heappush(value) {
    this.heap.push(value);
    let nowIndex = this.heap.length - 1;
    let parentIndex = Math.floor(nowIndex / 2);

    while (nowIndex > 1 && this.heap[parentIndex][1] > this.heap[nowIndex][1]) {
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
        this.heap[nowIndex][1] > this.heap[leftIndex][1]
      ) {
        this.swap(nowIndex, leftIndex);
        return returnValue;
      }
    }

    while (
      this.heap[rightIndex] &&
      (this.heap[nowIndex][1] > this.heap[leftIndex][1] ||
        this.heap[nowIndex][1] > this.heap[rightIndex][1])
    ) {
      if (this.heap[leftIndex][1] < this.heap[rightIndex][1]) {
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

const solution = (n, paths, gates, summits) => {
  const minHeap = new MinHeap();

  const graph = Array.from({ length: n + 1 }, () => []);

  paths.forEach(([a, b, c]) => {
    graph[a].push([b, c]);
    graph[b].push([a, c]);
  });

  const set = new Set(summits);

  gates.forEach((gate) => {
    minHeap.heappush([gate, 0]);
  });

  const dist = new Array(n + 1).fill(10000001);

  while (minHeap.length) {
    const [now, weight] = minHeap.heappop();
    if (dist[now] <= weight) continue;

    dist[now] = weight;

    if (set.has(now)) {
      continue;
    }
    set.add(now);

    if (graph[now]) {
      for (const [nxt, nxtWeight] of graph[now]) {
        const diff = Math.max(nxtWeight, weight);

        if (diff < dist[nxt]) {
          minHeap.heappush([nxt, diff]);
        }
      }
    }
  }

  const result = [-1, 10000001];

  summits
    .sort((a, b) => a - b)
    .forEach((v) => {
      if (dist[v] < result[1]) {
        result[0] = v;
        result[1] = dist[v];
      }
    });

  return result;
};
