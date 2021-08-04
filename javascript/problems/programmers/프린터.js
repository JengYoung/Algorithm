// class Queue { 
//     constructor(arr){
//         this.arr = arr;
//     }
//     append(val) {
//         this.arr.push(val);
//     }
//     popleft() {
//         return this.arr.shift();
//     }
//     check(now) {
//         return (this.arr.filter(val => (val > now)).length === 0)
//     }
//     getLength() {
//         return this.arr.length;
//     }
// }

// const solution = (priorities, location) => {
//     let cnt = 0; // 프린트한 문서 카운트.
//     const queue = new Queue(priorities);
    
//     while (queue.getLength() !== 0) {
//         const now = queue.popleft();
//         if (queue.check(now)) {
//             cnt++;
//             if (location === 0) break;
//         } 
//         else {
//             queue.append(now)
//         }
//         location = (location - 1) >= 0 ? location - 1 : (location - 1 + queue.getLength())
//     }
//     return cnt;
// }

// const priorities = [1, 1, 9, 1, 1, 1]
// const location = 0

// console.log(solution(priorities, location))

/*
    1. 인쇄 대기목록의 가장 앞에 있는 문서(J)를 대기목록에서 꺼냅니다.
    2. 나머지 인쇄 대기목록에서 J보다 중요도가 높은 문서가 한 개라도 존재하면 J를 대기목록의 가장 마지막에 넣습니다.
    3. 그렇지 않으면 J를 인쇄합니다.
*/ 

/*
    * 제한사항
    0 < 대기목록 <= 100
    중요도 : 1~9
    location은 0 이상 (현재 대기목록에 있는 작업 수 - 1) 이하의 값을 가지며 대기목록의 가장 앞에 있으면 0, 두 번째에 있으면 1로 표현
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
//     check(now) {
//         return this.queue.filter(val => val > now).length === 0;
//     }
//     size() {
//         return this.rear - this.front;
//     }
//     print() {
//         console.log(this.queue)
//     }
// }

// /*
//     1. 사실상 구현....? 일단 
// */ 
// const solution = (priorities, location) => {
//     let answer = 0;
//     const queue = new Queue();
//     priorities.forEach(val => queue.enqueue(val));
//     while(queue.size()) {
//         const now = queue.dequeue();
//         if (queue.check(now)) {
//             answer += 1;
//             if (location === 0) break;
//         } else {
//             queue.enqueue(now);
//         }
//         location = (location - 1) >= 0 ? location - 1 : (location - 1 + queue.size())
//     }
//     return answer;
// }

// const priorities = [2, 1, 3, 2];
// const location = 2;
// console.log(solution(priorities, location))

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
    }
    enqueue(newValue) {
        const newNode = new Node(newValue);
        if (this.head === null) {
            this.head = this.tail = newNode
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
    }
    dequeue() {
        const value = this.head.value;
        this.head = this.head.next;
        return value;
    }
    peek() {
        return this.head.value;
    }
}

function solution(priorities, location) {
    const queue = new Queue();
    for (let i = 0; i < priorities.length; i += 1) {
        queue.enqueue(priorities[i], i)
    }
    priorities.sort((a, b) => b - a);

    let count = 0;
    while (true) {
        const currentValue = queue.peek();
        if (currentValue[0] < priorities[count]) {
            queue.enqueue(queue.dequeue());
        } else {
            const value = queue.dequeue();
            count += 1;
            if (location === value[1]) {
                return count;
            }
        }
    }
}


const priorities = [2, 1, 3, 2];
const location = 2;
console.log(solution(priorities, location));