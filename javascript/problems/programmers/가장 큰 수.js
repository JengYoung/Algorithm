/*
    1. 정렬을 한다.
*/ 
const solution = (numbers) => {
    if (numbers.every(number => number === 0)) return "0";
    numbers.sort((a, b) => {
        const [ strA, strB ] = [ a.toString(), b.toString() ];
        return parseInt(strB + strA) - parseInt(strA + strB)
    });
    return numbers.join("")
}
const numbers = [0,0,0,0,0,0];
console.log(solution(numbers));


const solution = (numbers) => 
    numbers.every(number => number === 0) ?
    "0" :
    numbers.sort((a, b) => {
        const [ strA, strB ] = [ a.toString(), b.toString() ];
        return parseInt(strB + strA) - parseInt(strA + strB)
    }).join("");