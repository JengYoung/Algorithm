class CustomQueue {
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

const makeGraph = (numCourses, prerequisites) => {
  const indegrees = Array.from({ length: numCourses }, () => 0);
  const graph = Array.from({ length: numCourses }, () => []);

  prerequisites.forEach(([a, b]) => {
    graph[b].push(a);
    indegrees[a] += 1;
  });

  return { indegrees, graph };
};

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function (numCourses, prerequisites) {
  const { indegrees, graph } = makeGraph(numCourses, prerequisites);

  const queue = new CustomQueue();

  indegrees.forEach((indegree, course) => {
    if (!indegree) {
      queue.enqueue(course);
    }
  });

  if (!queue.size()) return false;

  while (queue.size()) {
    const now = queue.dequeue();

    for (let i = 0; i < graph[now].length; i += 1) {
      const nextCourse = graph[now][i];

      indegrees[nextCourse] -= 1;

      if (indegrees[nextCourse] === 0) {
        queue.enqueue(nextCourse);
      }
    }
  }

  return !indegrees.some(Boolean);
};
