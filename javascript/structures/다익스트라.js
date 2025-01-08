class MinHeap {
  constructor() {
    this.items = [];
  }

  size() {
    return this.items.length;
  }

  heappush(value) {
    this.items.push(value);

    this.bubbleUp();
  }

  swap(a, b) {
    [this.items[a], this.items[b]] = [this.items[b], this.items[a]];
  }

  heappop() {
    if (!this.size()) {
      return null;
    }

    const min = this.items[0];

    this.items[0] = this.items[this.size() - 1];
    this.items.pop();

    this.bubbleDown();

    return min;
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

      const isLeftBiggerThanRight =
        rightIndex < this.size() &&
        this.items[rightIndex][0] < this.items[leftIndex][0];

      const minIndex = isLeftBiggerThanRight ? rightIndex : leftIndex;

      if (this.items[index][0] <= this.items[minIndex][0]) {
        break;
      }

      this.swap(index, minIndex);
      index = minIndex;
    }
  }
}

const solution = (graph, start) => {
  const minHeap = new MinHeap();

  const distance = {};

  for (const node in graph) {
    distance[node] = {
      value: Infinity,
      prev: null,
    };
  }

  distance[start].value = 0;
  minHeap.heappush([start, 0]);

  while (minHeap.size()) {
    const [now, cost] = minHeap.heappop();

    if (cost > distance[now].value) {
      continue;
    }

    for (const nextNode in graph[now]) {
      const nextDist = cost + graph[now][nextNode];

      console.log(nextNode, distance);

      if (distance[nextNode].value >= nextDist) {
        distance[nextNode].value = nextDist;
        distance[nextNode].prev = nextNode;

        minHeap.heappush([nextNode, nextDist]);
      }
    }
  }

  console.log(distance);
};

console.log(solution({ A: { B: 9, C: 3 }, B: { A: 5 }, C: { B: 1 } }, 'A'));
// [{'A': 0, 'B': 4, 'C': 3}, {'A': ['A'], 'B': ['A', 'C', 'B'], 'C': ['A', 'C']}]

console.log(solution({ A: { B: 1 }, B: { C: 5 }, C: { D: 1 }, D: {} }, 'A'));
// [{'A': 0, 'B': 1, 'C': 6, 'D': 7}, {'A': ['A'], 'B': ['A', 'B'], 'C': ['A', 'B', 'C'], 'D': ['A', 'B', 'C', 'D']}]
