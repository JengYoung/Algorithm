class Queue {
    constructor() {
        this.queue = [];
        this.front = 0;
        this.rear = 0;
    }
    enqueue(newValue) {
        this.queue[this.rear++] = newValue;
    }
    dequeue() {
        const value = this.queue[this.front];
        delete this.queue[this.front];
        this.front += 1;
        return value;
    }
    peek() {
        return this.queue[this.front]
    }
    size() {
        return this.rear - this.front;
    }
}

const initialize = n => {
    const graph = Array.from(Array(n + 1), () => []);
    const visited = Array.from(Array(n + 1), () => false)
    return [ graph, visited ]
}

const solution = (n, vertex) => {
    // 인덱스를 고려한 계산 편의성을 위해 n + 1로 설정
    const [ graph, visited ] = initialize(n);
    vertex.forEach(([a, b]) => {
        graph[a].push(b);
        graph[b].push(a);
    });

    const start = 1;

    const queue = new Queue();
    queue.enqueue([start, 0]);
    visited[start] = true;

    let maxCost = 0;
    let maxCostCount = 0;
    
    while(queue.size()) {
        const [now, cost] = queue.dequeue();
        if (maxCost < cost) {
            maxCost = cost;
            maxCostCount = 1;
        } else if (maxCost === cost) {
            maxCostCount += 1;
        }

        graph[now].forEach(next => {
            if (visited[next]) return;
            visited[next] = true;
            
            queue.enqueue([next, cost + 1]);
        })
    }
    return maxCostCount
};