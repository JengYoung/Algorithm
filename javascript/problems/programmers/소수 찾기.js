function permutations(numbersConvertedArr, cnt) {
    const result = []
    if (cnt === 1) return numbersConvertedArr.map(val => [val]);
    numbersConvertedArr.forEach((number, nowIdx) => {
        const candidatesNumbersArr = numbersConvertedArr.filter((number, cmpIndex) => nowIdx !== cmpIndex);
        const combArr = permutations(candidatesNumbersArr, cnt - 1)
        const nowResult = combArr.map(c => [ number, ...c ])
        result.push(...nowResult)
    })
    return result
}

function checkValid(number) {
    if (number === 1) return false;
    for (let i = 2; i * i <= number; i++) {
        if (number % i === 0) return false;
    }
    return true;
}

function solution(numbers) {
    let answer = [];
    for (let i = 1; i <= numbers.length; i++) {
        const numberList = numbers.length > 1 ? permutations(numbers.split(""), i) : [[parseInt(numbers)]];
        numberList.forEach( arr => {
            const number  = parseInt(arr.join(""));
            if (answer.includes(number) || number === 0) return;
            if (checkValid(number)) {
                answer.push(number);
            }
        })
    }
    return answer.length;
}