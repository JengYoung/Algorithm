function combinations(arr, num) {
    // 결과를 반환하는 빈 배열 객체를 생성한다.
    const resArr = [];

    // 만약 1개를 추출해야 한다면, 각 인덱스에 속한 값을 담은 2차원 배열을 반환한다.
    if (num === 1) return arr.map(val => [val]);

    // for문을 돌린다.
    arr.forEach((now, nowIdx) => {
        // 조합에서의 핵심은 기존 선택했던 값과 중복되면 안된다. 따라서 이렇게 기존 인덱스보다 큰 값만 필터링한다.
        const restArr = arr.filter((each, eachIdx) => nowIdx < eachIdx);
        // 재귀함수로 실행하여 now를 제외했을 때의 조합들을 구한다.
        const cArr = combinations(restArr, num - 1);
        // 각 값에 now를 포함시켜 2차원 배열을 생성
        const result = cArr.map(c => [now, ...c]);
        // 현재 for문의 결과를 resArr에 담는다.
        resArr.push(...result);
    });

    return resArr;
}

const test = [0,1,1];
const result = combinations(test, 3);
console.log(result)