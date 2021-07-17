// 그냥 단순히 만든 큐
// const arr = new Array(10).fill();
// arr.forEach((val, idx) => {
//     arr[idx] = idx + 1;
// })
// console.log(arr)

// for (let i = 11; i < 21; i++) {
//     const poppedValue = arr.shift();
//     console.log(poppedValue)
//     arr.push(i);
//     console.log(arr);
// }

class Queue {
    constructor() {
        this.arr = [];
    }
    append(value) {
        this.arr.push(value);
        // (선택사항) 원한다면 추가시마다 console로 확인 가능하도록
        return this.arr;
    }
    popleft() {
        // pop된 값을 활용할 수 있도록 반환
        return this.arr.shift();
    }

    // 현재 큐를 볼 수 있는 메서드
    getQueue() {
        return this.arr;
    }
}

const queue = new Queue();
queue.append(1);
queue.append(2);
queue.append(101);
queue.popleft();
console.log(queue.print());