const reduce = (cb) => (acc, iter) => {
    if (!iter) acc = (iter = acc[Symbol.iterator]()).next().value;
    for (const i of iter) acc = cb(acc, i);
    return acc;
};

const go = (arg, ...fs) => {
    return reduce((arg, f) => f(arg))(arg, fs);
};

const map = cb => {
    return function* (iter) {
        for (const i of iter) yield cb(i);
    };
};


function* repeat(a) {
    while(true) yield a;
}

const isFlatable = a =>
    a != null && !!a[Symbol.iterator] && typeof a !== 'string';

function* flat(iter) {
    for (const a of iter) isFlatable(a) ? yield* a : yield a;
}

function take(limit) {
    return function *(iter) {
        for (const a of iter) {
            yield a;
            if (--limit === 0) break;
        }
    }
}


function makePatterns(length) {
    return function (pattern) {
        return go(
            pattern, 
            repeat,
            flat,
            take(length),
            a => [...a]
        );
    };
};

function checkWithAnswers(answer) {
    return function* (patterns) {
        const patternsIter = patterns[Symbol.iterator]();
        const answerIter = answer[Symbol.iterator]();
        // 만약 하나라도 더 길다하면, 결국 답을 안 낸거니 오답 처리.
        while (true) {
            const { value: patternsValue, done: patternsDone } = patternsIter.next();
            const { value: answerIterValue, done: answerDone } = answerIter.next();
            if (patternsDone && answerDone) break;
            yield patternsValue === answerIterValue
        }
    }
}

// JS에서는 true가 1, false가 0인 점을 이용한다.
function makeScore(iter) {
    return reduce((acc, cur) => acc + cur)(0, iter)
}

function countCorrect(answer) {
    return function ({ name, pattern }) {
        return {
            name,
            count: go(
                pattern,
                makePatterns(answer.length),
                checkWithAnswers(answer),
                makeScore
            )
        }
    }
};


function getBestScorer(students) {
    return reduce((acc, { name, count }) => {
        if (count > acc.score) return { score: count, scorer: [name] };
        else if (count === acc.score) return { ...acc, scorer: [ ...acc.scorer, name]}
        else return acc;
    })({ score: 0, scorer: [] }, students)
}

const students = [
    { name: 1, pattern: [1,2,3,4,5] }, 
    { name: 2, pattern: [2,1,2,3,2,4,2,5] }, 
    { name: 3, pattern: [3,3,1,1,2,2,4,4,5,5] }
]

const solution = (answer) => {
    return go(
        students,
        map(countCorrect(answer)),
        getBestScorer,
        ({ scorer }) => scorer
    )
}


const answer = [1,5,2,3,4,5,2,1,4,4,2,5,2];
console.log(solution(answer));