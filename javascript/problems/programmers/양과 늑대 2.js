class Queue {
  constructor() {
    this.queue = [];
    this.front = 0;
    this.rear = 0;
  }
  enqueue(value) {
    this.queue[this.rear++] = value;
  }
  dequeue() {
    const value = this.queue[this.front];
    delete this.queue[this.front];
    this.front += 1;
    return value;
  }
  peek() {
    return this.queue[this.front];
  }
  size() {
    return this.rear - this.front;
  }
}

const makeGraph = (info, edges) => {
  const graph = Array.from({ length: info.length }, () => []);

  edges.forEach(([from, to]) => {
    graph[from].push(to);
  });

  return graph;
};

const getNextCount = (info, index, sheep, wolf) => {
  return {
    sheep: sheep + (info[index] === 0),
    wolf: wolf + (info[index] === 1),
  };
};

const solution = (info, edges) => {
  let result = 0;

  const graph = makeGraph(info, edges);

  const queue = new Queue();

  queue.enqueue({
    passedNodes: graph[0], // 다른 후보지에 대한 체크용도
    ...getNextCount(info, 0, 0, 0),
  });

  while (queue.size()) {
    const { sheep, wolf, passedNodes } = queue.dequeue();

    if (sheep > wolf) {
      result = sheep;
    }

    for (const nodeIndex of passedNodes) {
      const { sheep: nextSheep, wolf: nextWolf } = getNextCount(
        info,
        nodeIndex,
        sheep,
        wolf
      );

      if (nextSheep > nextWolf) {
        const nextPassedNodes = passedNodes
          .filter((v) => v !== nodeIndex)
          .concat(graph[nodeIndex]);

        queue.enqueue({
          sheep: nextSheep,
          wolf: nextWolf,
          passedNodes: nextPassedNodes,
        });
      }
    }
  }

  return result;
};

console.log(
  solution(
    [0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1],
    [
      [0, 1],
      [1, 2],
      [1, 4],
      [0, 8],
      [8, 7],
      [9, 10],
      [9, 11],
      [4, 3],
      [6, 5],
      [4, 6],
      [8, 9],
    ]
  )
); // 5

console.log(
  solution(
    [0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0],
    [
      [0, 1],
      [0, 2],
      [1, 3],
      [1, 4],
      [2, 5],
      [2, 6],
      [3, 7],
      [4, 8],
      [6, 9],
      [9, 10],
    ]
  )
); // 5
