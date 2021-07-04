const arr = new Array(10).fill();
arr.forEach((val, idx) => {
    arr[idx] = idx + 1;
})
console.log(arr)

for (let i = 11; i < 21; i++) {
    const poppedValue = arr.shift();
    console.log(poppedValue)
    arr.push(i);
    console.log(arr);
}