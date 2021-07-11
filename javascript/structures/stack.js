// const arr = [1,2,3,4,5,6,7,8,9,10]

// 뒤쪽에 값 추가
// arr.push(11);

// 뒤쪽의 값 제거
// arr.pop();
// console.log(arr);

// for (let i = 11; i < 21; i++) {
//     arr.push(i);
// }

// console.log(arr);
/*
    1,  2,  3,  4,  5,  6,  7,
    8,  9, 10, 11, 11, 12, 13,
    14, 15, 16, 17, 18, 19, 20
*/

// for (let i = 0; i < 10; i++) {
//     const poppedValue = arr.pop();
//     console.log(poppedValue, arr);
// }
// console.log(arr)


class Stack {
    constructor() {
        this.arr = [];
    }
    append(value) {
        this.arr.push(value);
    }
    pop() {
        // pop된 data를 반환함으로써 활용 가능
        return this.arr.pop();
    }
    print() {
        return this.arr;
    }
}
const stack = new Stack();
stack.append(1);
stack.append(2);
stack.append(3);
stack.pop(); // 3
console.log(stack.print())