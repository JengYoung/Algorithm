"use strict"
function zip(a) {
    return function* (b) {
        a = a[Symbol.iterator]();
        b = b[Symbol.iterator]();
        while (true) {
            const { value, done } = a.next();
            const { value: value2, done: done2 } = b.next();
            if (done && done2) break;
            yield [value, value2];
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

function go(arg, ...fs) {
    return reduce((arg, f) => f(arg))(arg, fs);
}

function map(f) {
    return function *(iter) {
        for (const a of iter) yield f(a)
    }
}   

function checkAllCompleted(iter) {
    return filter(iter => iter[2] === true).length === iter.length
}

function groupByDistributionDate(iter) {
    return reduce((acc, current) => {
        if (!acc.length || acc[acc.length - 1][0] < current) return [...acc, [current]];
        else acc[acc.length -1] = acc[acc.length - 1].concat([current]);
        return acc;
    })([], iter)
}

const getCountsByGroup = (iter) => {
    return iter.length
}

const getRemainTimesToComplete = (progresses, speeds) => {
    return go(
        speeds,
        zip(progresses),
        map(([progress, speed]) => Math.ceil((100 - progress) / speed)),
    )
}
const solution = (progresses, speeds) => {
    return go(
        getRemainTimesToComplete(progresses, speeds),
        groupByDistributionDate,
        map(getCountsByGroup),
        a => [...a]
    )
}
const progresses = [95, 90, 99, 99, 80, 99];
const speeds = [1, 1, 1, 1, 1, 1];

console.log(solution(progresses, speeds))