/*
    완전이진트리의 성질
    1. 왼쪽 자식의 index = 부모 index * 2
    2. 오른쪽 자식의 index = (부모 index * 2) + 1
    3. 부모의 index = Math.floor(자식의 인덱스 / 2);
*/ 

class Heap {
    constructor() {
        // 1번째 요소임에 맞추기 위해 첫 배열 값을 비워둔다.
        this.heap = [ null ];
    }
    // 부모와 자식의 키값을 바꿔준다.
    swap(a, b) {
        [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]]
    }
    // 부모 인덱스를 업데이트해준다.
    updateParentIndex(nowIndex) {
        return Math.floor(nowIndex / 2);
    }
    // 값 비교 결과에 따라 nowIndex, leftIndex, rightIndex를 업데이트한다.
    updateIndices(index) {
        // nowIndex, leftIndex, rightIndex
        return [ index, index * 2, index * 2 + 1 ]
    }
    print() {
        console.log(this.heap)
    } 
}

class MinHeap extends Heap {
    constructor(heap) {
        super(heap)
    }
    heappush(value) {
        this.heap.push(value);
        // 배열의 마지막 index부터 시작.
        let nowIndex = this.heap.length - 1
        let parentIndex = this.updateParentIndex(nowIndex);
        /*
            nowIndex > 1 : 루트가 아닐 때까지.
            this.heap[parentIndex] > this.heap[nowIndex] : 최소힙 조건을 만족할 때까지
        */
        while(nowIndex > 1 && this.heap[parentIndex] > this.heap[nowIndex]) {
            this.swap(parentIndex, nowIndex)
            nowIndex = parentIndex;
            parentIndex = this.updateParentIndex(nowIndex);
        }
    }
    heappop() {
        const min = this.heap[1]
        // 첫번째 요소만이 있다면 그냥 빼면 되므로 early return
        if (this.heap.length <= 2) this.heap = [ null ];

        // 첫번째 요소를 없애고, 대신에 현재 마지막 요소를 넣는다.
        else this.heap[1] = this.heap.pop();

        // 루트 인덱스부터 시작하므로 nowIndex, leftIndex, rightIndex를 업데이트
        // let [ nowIndex, leftIndex, rightIndex ] = this.updateIndices(1);
        let nowIndex = 1;
        let leftIndex = nowIndex * 2;
        let rightIndex = nowIndex * 2 + 1; 

        // 왼쪽부터 시작하기 때문에 없으면 그대로 리턴
        if (!this.heap[leftIndex]) return min;

        // 오른쪽이 없다면 왼쪽에만 있다는 것. (왼쪽부터 시작하므로)
        if (!this.heap[rightIndex]) {
            if (this.heap[leftIndex] < this.heap[nowIndex]) {
                this.swap(leftIndex, nowIndex)
            }
            return min;
        }
        // 둘 다 존재하는 구조라면 leftIndex와 rightIndex를 비교하며 검사.
        while ((this.heap[leftIndex] < this.heap[nowIndex]) || (this.heap[rightIndex] < this.heap[nowIndex])) {
            const minIndex = (this.heap[leftIndex] > this.heap[rightIndex]) ? rightIndex : leftIndex;
            this.swap(minIndex, nowIndex);
            // [ nowIndex, leftIndex, rightIndex ] = this.updateIndices(minIndex);
            nowIndex = minIndex;
            leftIndex = nowIndex * 2;
            rightIndex = nowIndex * 2 + 1;
        }
        return min;
    }
}

const minHeap = new MinHeap();
minHeap.heappush(23)
minHeap.heappush(19)
minHeap.heappush(5)
minHeap.heappush(8)
minHeap.heappush(22)
minHeap.heappush(1)
minHeap.heappush(1)
minHeap.heappush(29)
let minVal = minHeap.heappop();
console.log(minVal);
minVal = minHeap.heappop();
console.log(minVal);
minVal = minHeap.heappop();
console.log(minVal);
minVal = minHeap.heappop();
console.log(minVal);
minVal = minHeap.heappop();
console.log(minVal);
