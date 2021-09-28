// 이분 탐색입니다. 해당 값이 어느 인덱스에 있을지를 탐색하여 결과를 반환합니다.
const binarySearch = (arr, target) => {
  let left = 0;
  let right = arr.length - 1;
  let mid = Math.floor((left + right) / 2);
  while(left <= right) {
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;

    mid = Math.floor((left + right) / 2);
  }
  // 가장 작은 값이 -1가 나오는데요, 이를 +1 처리해줄 겁니다. 
  // 그럼 반환되는 최솟값이, 0이겠죠?
  return mid + 1; 
}

const getInfos = (info) => {
  const infos = {}
  info.forEach(infoString => {
    const arr = infoString.split(" ")
    const score = parseInt(arr.pop())
    const key = arr.join("");
    if (infos[key]) infos[key].push(score)
    else infos[key] = [score];
  });
  for (const key in infos) {
    infos[key].sort((a, b) => a - b); 
  }
  return infos;
}

const getResult = (infos, query, score) => {
  const infosKey = Object.keys(infos);
  return infosKey
  .filter(key => query.every(v => key.includes(v)))
  .reduce((acc, key) => acc + infos[key].length - binarySearch(infos[key], score), 0);
}

const solution = (info, query) => {
  let answer = [];
  const infos = getInfos(info)
  query
    .map(q => q
			.split(/ and | |-/i)
			.filter(v => v !== ""))
    .forEach(query => {
      const score = query.pop();
      const result = getResult(infos, query, score);
      answer.push(result)
    })
  return answer;
}
(() => {
  const info = [
    "java backend junior pizza 150",
    "python frontend senior chicken 210",
    "python frontend senior chicken 150",
    "cpp backend senior pizza 260",
    "java backend junior chicken 80",
    "python backend senior chicken 50"
  ];
  
  const query = [
    "java and backend and junior and pizza 100",
    "python and frontend and senior and chicken 200",
    "cpp and - and senior and pizza 250",
    "- and backend and senior and - 150",
    "- and - and - and chicken 100",
    "- and - and - and - 150"
  ];
  
  console.log(solution(info, query))  
})()