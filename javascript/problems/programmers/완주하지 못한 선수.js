const copyArray = arr => [...arr];
const sortArray = arr => {
    return go(
        arr,
        copyArray
    ).sort()
}

function filterDifferentValues(arr) {
    return function* (iter) {
        const arrIterator = arr[Symbol.iterator]();
        const iterIterator = iter[Symbol.iterator]();
        let arrNext = arrIterator.next();
        let iterNext = iterIterator.next()
        while (!(arrNext).done && !(iterNext).done) {
            if (arrNext.value !== iterNext.value) yield iterNext.value;
            arrNext = arrIterator.next();
            iterNext = iterIterator.next();
        }
        if (!arrNext.done) yield arrNext.value;
        else yield iterNext.value;
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

const findFailedBySortedArrays = (participant, completion) => {
    return go(
        participant,
        filterDifferentValues(completion),
        take(1),
        ([a]) => a
    )
}
const solution = (participants, completion) => {
    return findFailedBySortedArrays(sortArray(participants), sortArray(completion))
}
const participants = ["marina", "josipa", "nikola", "vinko", "filipa"];
const completion = ["josipa", "filipa", "marina", "nikola"];
console.log(solution(participants, completion))