const solution = (n, lost, reserve) => {
    reserve.sort((a, b) => a - b).forEach(student => {
        if (lost.includes(student)) {
            lost.splice(lost.indexOf(student), 1);
            reserve = reserve.filter(now => now !== student)
        }
    })
    reserve.forEach(student => {
        if (lost.includes(student - 1)) lost.splice(lost.indexOf(student - 1) ,1);
        else if (lost.includes(student + 1)) lost.splice(lost.indexOf(student + 1) ,1);
    })
    return n - lost.length;
}

const n = 7
const lost =  [1, 2, 3, 4, 5, 6, 7]
const reserve = [1, 2, 3]
console.log(solution(n, lost, reserve))