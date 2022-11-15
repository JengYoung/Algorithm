const solution = (n, student, point) => {
  let result = 0;

  const arr = Array.from({ length: n }, (_, idx) => ({
    id: idx + 1,
    point: 0,
    last: idx + 1,
  }));

  const MIN_INFERIOR_CLASS_RANK_INDEX = n / 2 + 1;

  let scoreArr = JSON.parse(JSON.stringify(arr));

  student.forEach((s, i) => {
    const nowStudentIndex = student[i];
    const nowPoint = point[i];

    scoreArr = scoreArr.map((score) =>
      score.id === nowStudentIndex
        ? { ...score, point: score.point + nowPoint }
        : { ...score }
    );

    const sortedArr = [...scoreArr].sort((a, b) => {
      return a.point - b.point !== 0 ? b.point - a.point : a.id - b.id;
    });

    let flag = false;

    sortedArr.forEach((score, idx) => {
      const nextRank = idx + 1;

      if (
        score.last >= MIN_INFERIOR_CLASS_RANK_INDEX &&
        nextRank < MIN_INFERIOR_CLASS_RANK_INDEX
      ) {
        flag = true;
      }

      sortedArr[idx] = { ...score, last: nextRank };
    });

    if (flag) result += 1;

    scoreArr = sortedArr;
  });

  return result;
};

const n = 10;
const student = [3, 2, 10, 2, 8, 3, 9, 6, 1, 2];
const point = [3, 2, 2, 5, 4, 1, 2, 1, 3, 3];

console.log(solution(n, student, point));
