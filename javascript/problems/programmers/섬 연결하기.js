class MinHeap {
    constructor(heap = [ null ]) {
        this.heap = heap;
    }
    swap(a, b) {
        [this.heap[b], this.heap[a]] = [this.heap[a], this.heap[b]];
    }
    updateParentIndex(nowIndex) {
        return Math.floor(nowIndex / 2);
    }
    updateIndices(index) {
        return [index, index * 2, index * 2 + 1]
    }
    heappush(value) {
        this.heap.push(value);
        let nowIndex = this.heap.length - 1;
        let parentIndex = this.updateParentIndex(nowIndex);
        while(nowIndex > 1 && this.heap[nowIndex][0] < this.heap[parentIndex][0]) {
            this.swap(parentIndex, nowIndex);
            nowIndex = parentIndex;
            parentIndex = this.updateParentIndex(nowIndex);
        }
    }
    heappop() {
        if (this.heap.length === 1) return;
        if (this.heap.length === 2) return this.heap.pop();
        const min = this.heap[1];
        this.heap[1] = this.heap.pop();
        let [ nowIndex, leftIndex, rightIndex ] = this.updateIndices(1);
        if (!this.heap[leftIndex]) return min;
        if (!this.heap[rightIndex]) {
            if (this.heap[leftIndex][0] < this.heap[nowIndex][0]) {
                this.swap(nowIndex, leftIndex);
            }
            return min;
        };
        while(true) {
            if(!(this.heap[leftIndex][0] < this.heap[nowIndex][0] || this.heap[rightIndex][0] < this.heap[nowIndex][0])) break;
            const minIndex = (this.heap[leftIndex][0] < this.heap[rightIndex][0]) ? leftIndex : rightIndex;
            this.swap(nowIndex, minIndex);
            [ nowIndex, leftIndex, rightIndex ] = this.updateIndices(minIndex);
            if (rightIndex >= this.heap.length) break; 
        };
        return min;
    };
};

const n = 6;
const costs = [[0, 1, 5], [0, 3, 2], [0, 4, 3], [1, 4, 1], [3, 4, 10], [1, 2, 2], [2, 5, 3], [4, 5, 4]];

/*
    1. 우선순위 큐를 만든다.
    2. 다 넣고 visited를 체크한다.
    3. 결과적으로 최소 비용들만 빼내며 visited와 중복되는지만 체크. (이는 양쪽으로 해야 하는 것에 주의하자.)
*/

const findParent = (parent, x) => {
    if (parent[x] === x) return x;
    return findParent(parent, parent[x]);
}

const updateParent = (parent, a, b) => {
    const parentA = findParent(parent, a);
    const parentB = findParent(parent, b);
    if (parentA < parentB) parent[parentB] = parent[parentA];
    else if (parentB < parentA) parent[parentA] = parent[parentB];
}


const solution = (n, costs) => {
    const minHeap = new MinHeap();
    costs.map(([a, b, c]) => minHeap.heappush([c, b, a])) // [cost, from, to]
    const parent = Array.from(new Array(n), (_, idx) => idx);
    let totalMinCost = 0;
    while (minHeap.heap.length !== 1) {
        const [ cost, from, to ] = minHeap.heappop();
        if (findParent(parent, from) !== findParent(parent, to)) {
            totalMinCost += cost;
            updateParent(parent, from, to);
        }
    }
    return totalMinCost
}
console.log(solution(n, costs));