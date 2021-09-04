
const solution = gems => {
  let answer = [-Infinity, Infinity]
  const maxCnt = [...new Set(gems)].length;
  const nowJewels = new Map();
  let [ start, end ] = [ 0, 0 ];
  
  while (start < gems.length) {
    while (maxCnt > nowJewels.size && end < gems.length) {
      nowJewels.set(gems[end], nowJewels.has(gems[end]) ? nowJewels.get(gems[end]) + 1 : 1);
      end += 1;
    }
    while (start < gems.length && nowJewels.get(gems[start]) !== 1) {
      nowJewels.set(gems[start], nowJewels.get(gems[start]) - 1);
      start += 1;
    }
    if (maxCnt === nowJewels.size && (answer[1] - answer[0] > end - start )) {
      answer = [ start, end ];
    }
    nowJewels.delete(gems[start])
    start += 1;
  }

  return [ answer[0] + 1, answer[1] ]
}

const gems = 	["DIA", "RUBY", "RUBY", "DIA", "DIA", "EMERALD", "SAPPHIRE", "DIA"]
console.log(solution(gems))