// 비손실 압축 방법
const raw = "AAAAAABBBDFFFFFFFKK";
const compressed = "6A3B1D7F2K"

const regExp = /(.)\1*/g;
const result = raw
    .match(regExp)
    .reduce((a, b) => a + `${b.length}${b.slice(0,1)}`, "");
console.log(result);
console.log(result === compressed);