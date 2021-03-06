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
    // ????????????: time
    let time = 0;

    const minHeap = new MinHeap();
    jobs.forEach(job => minHeap.heappush(job));

    // ?????? ?????? ???????????? ?????? ?????? ?????? ????????? ????????? ??????
    let [ minStart, minStartPeriod ] = [ Infinity, Infinity ];
    let arr = [];
    while (true) {
        if (minHeap.getLength() === 1 && arr.length === 0) {
            const result = (minStart !== Infinity) ? (totalTime + minStartPeriod) : totalTime;
            return Math.floor(result / jobs.length);
        }
        // ?????? ?????? ????????? ??? ????????? ??? ?????? ???????????? ?????? ?????? minHeap??? ?????????.
        if (arr.length > 0 && minHeap.getLength() === 1) {
            if (minStart) {
                time = minStart + minStartPeriod;
                totalTime += time - minStart;
            }
            heappushArr();
            initializeMinStart();
            continue;
        };
        // ????????? ???????????? time, totalTime ??????????????? ?????? ????????????
        let [ start, period ] = minHeap.heappop();
        if (start <= time) {
            time += period;
            totalTime += time - start;
            heappushArr();
        }
        // ????????? ???????????? ????????????, ????????? ????????? pop
        else {
            initializeMinStart(start, period)
            // ????????? ?????? start??? time?????? ????????? ???????????? ?????? ?????? ?????? ??????
            while (minHeap.getLength() !== 1) {
                let [ start, period ] = minHeap.heappop();
                // ?????? ?????? ??????
                if (start <= time) {
                    time += period;
                    totalTime += time - start;
                    if (minStart !== Infinity) arr.push([ minStart, minStartPeriod ])
                    heappushArr();
                    initializeMinStart();
                    break;
                }
                // ????????? ???????????? ?????? ??????!
                else {
                    if (start < minStart) {
                        //?????? ?????? minStart, minStartPeriod??? ?????? ???????????? ???.
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