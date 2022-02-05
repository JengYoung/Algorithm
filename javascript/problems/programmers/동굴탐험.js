class Queue {
  constructor() {
    this.arr = [];
    this.front = 0;
    this.rear = 0;
  }
  enqueue(value) {
    this.arr[this.rear] = value;
    this.rear += 1;
  }

  dequeue() {
    const value = this.arr[this.front];
    delete this.arr[this.front];
    this.front += 1;

    return value;
  }

  getLength() {
    return this.rear - this.front;
  }
}

const dfs = (node, undirectedGraph, visited, directedGraph) => {
  visited[node] = true;
  for (let now of undirectedGraph[node]) {
    if (visited[now]) continue;

    directedGraph[node] = directedGraph[node]
      ? directedGraph[node].concat([now])
      : [now];

    dfs(now, undirectedGraph, visited, directedGraph);
  }
  return directedGraph;
};

const topologySort = (graph, indegree) => {
  const queue = new Queue();
  let cnt = 0;
  queue.enqueue(0);

  while (queue.getLength()) {
    const now = queue.dequeue();
    cnt += 1;
    if (!graph[now]) continue;
    for (let next of graph[now]) {
      if (!indegree) continue;

      indegree[next] -= 1;
      if (!indegree[next]) {
        queue.enqueue(next);
      }
    }
  }

  return cnt;
};

const solution = (n, path, order) => {
  var answer = true;

  const indegree = Array(n).fill(0);
  const visited = Array(n).fill(false);

  const undirectedGraph = {};

  // create undirected graph
  for (let [from, to] of path) {
    undirectedGraph[from] = undirectedGraph[from]
      ? undirectedGraph[from].concat([to])
      : [to];
    undirectedGraph[to] = undirectedGraph[to]
      ? undirectedGraph[to].concat([from])
      : [from];
  }

  // create directed graph to proceed to topology sort
  const directedGraph = dfs(0, undirectedGraph, visited, {});

  // update directed graph for assign indegree value
  for (let [from, to] of order) {
    directedGraph[from] = directedGraph[from]
      ? directedGraph[from].concat([to])
      : [to];
  }

  // assign indegree array with fan-in value
  for (let node in directedGraph) {
    for (let leaf of directedGraph[node]) {
      indegree[leaf] += 1;
    }
  }

  const cnt = topologySort(directedGraph, indegree);

  return n === cnt;
};

(() => {
  const n = 9;
  const path = [
    [0, 1],
    [0, 3],
    [0, 7],
    [8, 1],
    [3, 6],
    [1, 2],
    [4, 7],
    [7, 5],
  ];

  const order = [
    [8, 5],
    [6, 7],
    [4, 1],
  ];

  console.log(solution(n, path, order));
})();

(() => {
  const n = 9;
  const path = [
    [0, 1],
    [0, 3],
    [0, 7],
    [8, 1],
    [3, 6],
    [1, 2],
    [4, 7],
    [7, 5],
  ];

  const order = [
    [8, 5],
    [6, 7],
    [4, 1],
  ];

  console.log(solution(n, path, order));
})();

(() => {
  const n = 9;
  const path = [
    [0, 1],
    [0, 3],
    [0, 7],
    [8, 1],
    [3, 6],
    [1, 2],
    [4, 7],
    [7, 5],
  ];

  const order = [
    [8, 5],
    [6, 7],
    [4, 1],
  ];

  console.log(solution(n, path, order));
})();
