class MinHeap {
    constructor() {
        this.heap = [null];
    }
    updateParentIndex(index) {
        return Math.floor(index / 2);
    }
    updateIndices(index) {
        return [ index, index * 2, index * 2 + 1]
    }
    swap(a, b) {
        [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
    }
    heappush(val) {
        this.heap.push(val);
        let nowIndex = this.heap.length - 1;
        let parentIndex = this.updateParentIndex(nowIndex);
        while(nowIndex > 1 && this.heap[parentIndex][0] > this.heap[nowIndex][0]) {
            this.swap(nowIndex, parentIndex)
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
                this.swap(leftIndex, nowIndex);
            }
            return min;
        }
        while ((this.heap[leftIndex][0] < this.heap[nowIndex][0]) || (this.heap[rightIndex][0] < this.heap[nowIndex][0])) {    
            const minIndex = this.heap[leftIndex][0] <= this.heap[rightIndex][0] ? leftIndex : rightIndex;
            this.swap(nowIndex, minIndex);
            [ nowIndex, leftIndex, rightIndex ] = this.updateIndices(minIndex);
            if (!this.heap[leftIndex]) return min;
            if (!this.heap[rightIndex]) { 
                if (this.heap[leftIndex][0] < this.heap[nowIndex][0]) {
                    this.swap(leftIndex, nowIndex);
                }
                return min;
            }
        }
        return min;
    }
    print() {
        console.log(this.heap)
    }
    getLength() {
        return this.heap.length;
    }
}

const getMinChangeCount = (before, after) => {
    const count = Math.abs(before.charCodeAt(0) - after.charCodeAt(0));
    return Math.min(count, 26 - count);
};
const createPushedArr = (name, beforeCount, nowIndex, nextIndex, arr) => {
    const count = Math.max(nowIndex, nextIndex) - Math.min(nowIndex, nextIndex);
    return [beforeCount + Math.min(count, name.length - count), nextIndex, arr.filter(value => value !== nextIndex)]
}
const getResult = (name, minHeap) => {
    while(true) {
        const [cnt, idx, arr] = minHeap.heappop();
        if (arr.length === 0) return cnt;
        if (arr.length >= 1) {
            if (arr.length > 1) minHeap.heappush(createPushedArr(name, cnt, idx, arr[arr.length - 1], arr))
            minHeap.heappush(createPushedArr(name, cnt, idx, arr[0], arr))
        }
    }
}

const solution = name => {
    let answer = 0;
    const indexArr = [];
    const minHeap = new MinHeap();
    for (let i = 0; i < name.length; i++) {
        const now = name[i];
        if (now !== 'A') {
            if (now !== 0) indexArr.push(i); // 현재 가야 할 인덱스 번호 넣기
            answer += getMinChangeCount('A', now);
        }
    }
    // [ 목표 인덱스로 갔을 때 횟수, 간 결과 인덱스 위치, 남은 인덱스]
    if (indexArr.length === 0) return 0;
    if (indexArr.length >= 1) {
        if (indexArr.length > 1) minHeap.heappush(createPushedArr(name, 0, 0, indexArr[indexArr.length - 1], indexArr))
        minHeap.heappush(createPushedArr(name, 0, 0, indexArr[0], indexArr))
    }
    answer += getResult(name, minHeap);
    return answer;
}

const name = 'AAZ';
console.log(solution(name));