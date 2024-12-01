const copyArray = arr => [...arr];
const sortArray = arr => {
    return go(
        arr,
        copyArray
    ).sort()
}

function checkIfSameValue(left, right) {
    return (left === right) ? true : false;
}

function makeSameLangthArrays(firstArr, secondArr) {
    const lengthDifference = firstArr.length - secondArr.length;
    if (!lengthDifference) return [firstArr, secondArr]
    const concatArray = new Array(Math.abs(lengthDifference)).fill(null);
    return (lengthDifference > 0) 
        ? [firstArr, secondArr.concat(concatArray)] 
        : [firstArr.concat(concatArray), secondArr];
}
/* 
    배열끼리의 각 인덱스 값을 비교하면서 필터링해줍니다. 
    만약 다른 길이라면 통일시켜서 다른 길이만큼 다른 값으로 처리합니다.
*/
function filterDifferentValuesByIndex(comparedArray) {
    return function* (iter) {
        const [firstArr,secondArr] = makeSameLangthArrays(iter, comparedArray);
        const iterIterator = firstArr[Symbol.iterator]();
        const comparedArrayIterator = secondArr[Symbol.iterator]();
        while ((!(iterNext = iterIterator.next()).done && !(cmpNext = comparedArrayIterator.next()).done)) {
            if (!checkIfSameValue(cmpNext.value, iterNext.value)) yield iterNext.value;
        }
    } 
}

function reduce(f) {
    return function (acc, iter) {
        if (!iter) acc = (iter = acc[Symbol.iterator]()).next().value;
        for (const a of iter) acc = f(acc, a);
        return acc;
    }
}

function go(arg, ...funcs) {
    return reduce((a, f) => f(a))(arg, funcs);
}

function take(limit) {
    return function *(iter) {
        for (const a of iter) {
            yield a;
            if (--limit === 0) break;
        }
    }
}
function destructureArray([iter]) {
    return iter
}
const findFailedBySortedArrays = (participant, completion) => {
    return go(
        participant,
        filterDifferentValuesByIndex(completion), // comparedArray: completion, iter: participant
        take(1),
        destructureArray
    )
}
const solution = (participants, completion) => {
    return findFailedBySortedArrays(sortArray(participants), sortArray(completion))
}

const participants = ["marina", "josipa", "nikola", "filipa", "vinko"];
const completion = ["josipa", "filipa", "marina", "nikola"];
console.log(solution(participants, completion))