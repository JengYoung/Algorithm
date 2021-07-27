class Heap {
    constructor() {
        this.heap = [ null ];
    }
    swap(a, b) {
        [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
    }
    updateParentIndex(nowIndex) {
        return Math.floor(nowIndex / 2);
    }
    updateIndicies(minIndex) {
        return [ minIndex, minIndex * 2, minIndex * 2 + 1]
    }
    filterPossibleJob(time) {
        return this.heap.filter(([start, end]) => time >= start)
    }
    getLength() {
        return this.heap.length;
    }
    print() {
        console.log(this.heap)
    }
}

class MinHeap extends Heap {
    constructor() {
        super(Heap);
    }
    heappush(value){
        this.heap.push(value);
        let nowIndex = this.heap.length - 1;
        let parentIndex = this.updateParentIndex(nowIndex);
        while(nowIndex > 1 && this.heap[nowIndex][1] <= this.heap[parentIndex][1]) {
            if (this.heap[nowIndex][1] === this.heap[parentIndex][1] && this.heap[nowIndex][0] < this.heap[parentIndex][0]) {
                return;
            }
            this.swap(nowIndex, parentIndex);
            nowIndex = parentIndex;
            parentIndex = this.updateParentIndex(nowIndex);
        }
    }
    heappop(){
        const min = this.heap[1];
        if (this.heap.length === 1) return;
        if (this.heap.length === 2) return this.heap.pop();
        else this.heap[1] = this.heap.pop();
        let [ nowIndex, leftIndex, rightIndex ] = this.updateIndicies(1);
        if(!this.heap[leftIndex]) return min;
        if(!this.heap[rightIndex]) {
            if (this.heap[leftIndex][1] < this.heap[nowIndex][1]) {
                this.swap(leftIndex, nowIndex)
            }
            return min;
        }
        while(this.heap[leftIndex][1] < this.heap[nowIndex][1] || this.heap[rightIndex][1] < this.heap[nowIndex][1]) {
            let minIndex;
            if (this.heap[leftIndex][1] < this.heap[rightIndex][1]) minIndex = leftIndex;
            else if (this.heap[leftIndex][1] > this.heap[rightIndex][1]) minIndex = rightIndex;
            else {
                if (this.heap[leftIndex][0] <= this.heap[rightIndex][0]) minIndex = leftIndex;
                else minIndex = rightIndex
            }
            this.swap(minIndex, nowIndex);
            [ nowIndex, leftIndex, rightIndex ] = this.updateIndicies(minIndex);
            if(!this.heap[leftIndex]) return min;
            if(!this.heap[rightIndex]) {
                if (this.heap[leftIndex][1] < this.heap[nowIndex][1]) {
                    this.swap(leftIndex, nowIndex)
                }
                return min;
            }
        }
        return min;
    }
}

const solution = (jobs) => {
    const heappushArr = () => {
        while (arr.length) minHeap.heappush(arr.pop())
    }
    const initializeMinStart = (start = Infinity, period = Infinity) => {
        [ minStart, minStartPeriod ]  = [ start, period ]
    }
    // return: totalTime
    let totalTime = 0;
    // 소요시간: time
    let time = 0;

    const minHeap = new MinHeap();
    jobs.forEach(job => minHeap.heappush(job));

    // 만약 현재 처리되어 있지 않을 경우 계산을 대비한 변수
    let [ minStart, minStartPeriod ] = [ Infinity, Infinity ];
    let arr = [];
    while (true) {
        if (minHeap.getLength() === 1 && arr.length === 0) {
            const result = (minStart !== Infinity) ? (totalTime + minStartPeriod) : totalTime;
            return Math.floor(result / jobs.length);
        }
        // 만약 모든 일들이 다 처리될 수 없는 상태라면 그냥 다시 minHeap에 넣어줌.
        if (arr.length > 0 && minHeap.getLength() === 1) {
            if (minStart) {
                time = minStart + minStartPeriod;
                totalTime += time - minStart;
            }
            heappushArr();
            initializeMinStart();
            continue;
        };
        // 조건을 만족하면 time, totalTime 요구조건에 맞춰 업데이트
        let [ start, period ] = minHeap.heappop();
        if (start <= time) {
            time += period;
            totalTime += time - start;
            heappushArr();
        }
        // 조건을 만족하지 못한다면, 만족할 때까지 pop
        else {
            initializeMinStart(start, period)
            // 빼내온 값의 start가 time보다 짧거나 다빼오지 않는 이상 계속 실행
            while (minHeap.getLength() !== 1) {
                let [ start, period ] = minHeap.heappop();
                // 나올 경우 계산
                if (start <= time) {
                    time += period;
                    totalTime += time - start;
                    if (minStart !== Infinity) arr.push([ minStart, minStartPeriod ])
                    heappushArr();
                    initializeMinStart();
                    break;
                }
                // 나오지 않는다면 계속 계산!
                else {
                    if (start < minStart) {
                        //일단 이전 minStart, minStartPeriod는 다시 넣어줘야 함.
                        arr.push([ minStart, minStartPeriod ]);
                        initializeMinStart(start, period);
                    }
                    else arr.push([ start, period ]);
                }
            } 
        }
    }
}

const jobs = [[0, 3], [1, 9], [2, 6]]
console.log(solution(jobs))