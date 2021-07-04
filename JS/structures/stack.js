const arr = [1,2,3,4,5,6,7,8,9,10]

// 뒤쪽에 값 추가
// arr.push(11);

// 뒤쪽의 값 제거
// arr.pop();
console.log(arr);

for (let i = 11; i < 21; i++) {
    arr.push(i);
}

console.log(arr);
/*
    1,  2,  3,  4,  5,  6,  7,
    8,  9, 10, 11, 11, 12, 13,
    14, 15, 16, 17, 18, 19, 20
*/

for (let i = 0; i < 10; i++) {
    const poppedValue = arr.pop();
    console.log(poppedValue, arr);
}
console.log(arr)