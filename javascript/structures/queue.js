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

// class Queue {
//     constructor() {
//         this.arr = [];
//     }
//     append(value) {
//         this.arr.push(value);
//         // (선택사항) 원한다면 추가시마다 console로 확인 가능하도록
//         return this.arr;
//     }
//     popleft() {
//         // pop된 값을 활용할 수 있도록 반환
//         return this.arr.shift();
//     }

//     // 현재 큐를 볼 수 있는 메서드
//     getQueue() {
//         return this.arr;
//     }
// }

// const queue = new Queue();
// queue.append(1);
// queue.append(2);
// queue.append(101);
// queue.popleft();
// console.log(queue.print());


/*
    다른 구현 방법 -  array, front, rear을 통한 큐 구현
*/ 
// class Queue {
//     constructor() {
//         this.queue = [];
//         this.front = 0;
//         this.rear = 0;
//     }
//     enqueue(value) {
//         this.queue[this.rear++] = value;
//     }
//     dequeue() {
//         const value = this.queue[this.front];
//         delete this.queue[this.front];
//         this.front += 1;
//         return value;
//     }
//     peek() {
//         return this.queue[this.front];
//     }
//     size() {
//         return this.rear - this.front;
//     }
// }
// const queue = new Queue();
// queue.enqueue(1);
// queue.enqueue(2);
// queue.enqueue(4);
// console.log(queue.dequeue());
// queue.enqueue(8);
// console.log(queue.size());
// console.log(queue.peek());
// console.log(queue.dequeue());
// console.log(queue.dequeue());


/*
    Linked List로 구현
*/ 

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class Queue {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    enqueue(newValue) {
        const newNode = new Node(newValue);
        if (this.head === null) {
            this.head = this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.size += 1;
    }
    dequeue() {
        const value = this.head.value;
        this.head = this.head.next;
        this.size -= 1;
        return value;
    }
    peek() {
        return this.head.value;
    }
}


const queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(4);
console.log(queue.dequeue());
queue.enqueue(8);
console.log(queue.size);
console.log(queue.peek());
console.log(queue.dequeue());
console.log(queue.dequeue());
