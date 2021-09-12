const solution = (weights, head2head) => {
  return head2head
    .map((scores, idx) => [scores, weights[idx], idx])
    .sort((a, b) => {
      const firstSortStandard = 
        firstSortCallback(b[0]) - 
        firstSortCallback(a[0]);
      const secondSortStandard = 
        secondSortCallback(b[0], b[1], weights, b[2]) - 
        secondSortCallback(a[0], a[1], weights, a[2]);
      const thirdSortStandard = b[1] - a[1];
      const fourthSortStandard = a[2] - b[2];
      return firstSortStandard 
        || secondSortStandard 
        || thirdSortStandard 
        || fourthSortStandard;
    })
    .map(([head, weight, idx]) => idx + 1)
}

const firstSortCallback = (scores) => {
  const scoresArr = scores.split("")
  const winFightCount = scoresArr.filter(score => score === "W").length;
  const allFightCount = winFightCount + scoresArr.filter(score => score === "L").length;
  return allFightCount ? (winFightCount / allFightCount).toFixed(12) : 0;
}
const secondSortCallback = (head, weight, weights, idx) => {
  return head
    .split("")
    .filter((h, i) => i !== idx && h === "W" && weights[i] > weight)
    .length;
}


(() => {
  const weights = 	[60, 70, 60]
  const head2head = ["NNN", "NNN", "NNN"];
  console.log(solution(weights, head2head))
})()