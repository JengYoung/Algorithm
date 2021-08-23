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