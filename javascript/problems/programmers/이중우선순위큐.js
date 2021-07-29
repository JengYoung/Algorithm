class Heap {
    constructor() {
        this.heap = [ null ];
        this.weight = 1; // default: max;
    }
    swap(a, b) {
        [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
    }
    updateParentIndex(index) {
        return Math.floor(index / 2);
    }
    updateIndicies(index) {
        return [ index, index * 2, index * 2 + 1 ]
    }
    getLength() {
        return this.heap.length;
    }
    print() {
        console.log(this.heap, this.weight);
    }
    heapify() {
        const arr = [ ... this.heap ];
        this.heap = [];
        arr.forEach(value => this.heappush(value));
    }
    heappush(value) {
        this.heap.push(value);
        let nowIndex = this.heap.length - 1;
        let parentIndex = this.updateParentIndex(nowIndex);
        while (nowIndex > 1 && this.heap[nowIndex] * this.weight > this.heap[parentIndex] * this.weight ) {
            this.swap(nowIndex, parentIndex);
            nowIndex = parentIndex;
            parentIndex = this.updateParentIndex(nowIndex);
        }
    }
    heappop(weight) {
        if (this.heap.length === 1) return;
        if (this.heap.length === 2) return this.heap.pop();
        this.weight = weight;
        this.heapify();
        const result = this.heap[1];
        this.heap[1] = this.heap.pop();
        let [ nowIndex, leftIndex, rightIndex ] = this.updateIndicies(1);
        if (this.heap[leftIndex] === undefined) return result;
        if (this.heap[rightIndex] === undefined) {
            if (this.heap[leftIndex] * this.weight > this.heap[nowIndex] * this.weight) this.swap(leftIndex, nowIndex);
            return result;
        }
        if (this.heap[leftIndex] * this.weight > this.heap[nowIndex] * this.weight || this.heap[rightIndex] * this.weight > this.heap[nowIndex] * this.weight) {
            const updatedIndex = this.heap[leftIndex] * this.weight > this.heap[rightIndex] * this.weight ? leftIndex : rightIndex;
            this.swap(nowIndex, updatedIndex);
            [ nowIndex, leftIndex, rightIndex ] = this.updateIndicies(updatedIndex);
        }
        return result;
    }
    printResult() {
        if (this.heap.length === 1) return [0,0]
        else if (this.heap.length === 2) return [this.heap[1], this.heap[1]]
        else return [this.heappop(1), this.heappop(-1)]
    }
}


const solution = (operations) => {
    const heapq = new Heap();
    operations.forEach(operation => {
        const [ command, value ] = operation.split(" ");
        const intValue = parseInt(value);
        if (command === "I") heapq.heappush(intValue);
        else heapq.heappop(intValue);
        heapq.print()
    })
    return heapq.printResult()
};

const operations = 	["I -45", "I 653", "D 1", "I -642", "I 45", "I 97", "D 1", "D -1", "I 333"]
console.log(solution(operations));