function solution(data, col, row_begin, row_end) {
  let answer = 0;

  const sortedData = data.sort((a, b) => {
    const diff = a[col - 1] - b[col - 1];
    return diff ? diff : b[0] - a[0];
  });

  for (let i = row_begin; i <= row_end; i += 1) {
    const index = i;
    const now = sortedData[i - 1];

    const sum = now.reduce((acc, cur) => acc + (cur % index), 0);
    answer ^= sum;
  }

  return answer;
}
