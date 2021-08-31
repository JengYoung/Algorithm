/**
 * @param {string} s
 * @return {number}
 */
const convertSymbolIntoValue = symbol => {
    const symbolValues = {
        I: 1, 
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000,
    };
    return symbolValues[symbol];
}

/*
    1. 문자별 값들을 다 객체에 저장해둔다.
    2. 예외 상황들에 대해 조건을 달아놓는다.
    3. s를 스택화 시켜서, 빼면서 값을 계산.
*/
const romanToInt = s => {
    let result = 0;
    const sArr = s.split("");
    while (sArr.length) {
        const now = sArr.pop();
        const nowSLastSymbol = sArr[sArr.length - 1];
        if ((now === 'V' || now === 'X') && nowSLastSymbol === 'I') {
            sArr.pop();
            result = (now === 'V') ? result + 4 : result + 9;
        } else if ((now === 'L' || now === 'C') && nowSLastSymbol === 'X') {
            sArr.pop();
            result = (now === 'L') ? result + 40 : result + 90;
        } else if ((now === 'D' || now === 'M') && nowSLastSymbol === 'C') {
            sArr.pop();
            result = (now === 'D') ? result + 400 : result + 900;
        } else {
            result += convertSymbolIntoValue(now);
        }
    }
    return result;
};

const s = "MCMXCIV";
console.log(romanToInt(s))