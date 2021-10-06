const canCompleteCircuit = (gas, cost) => {
  const total = gas.map((g, i) => g - cost[i]);
  if (total.reduce((acc, cur) => acc + cur, 0) < 0) return -1;
  let lastIdx = 0;
  let cnt = 0;
  total.forEach((val, idx) => {
    if (cnt + val < 0) {
      cnt = 0;
      lastIdx = idx + 1;
      return;
    }
    cnt += val;
  })
  return lastIdx;
}

(() => {
  const gas = [67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66];
  const cost = [27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26];
  console.log(canCompleteCircuit(gas, cost))
})();

/**
 * 
 * 

  while (i < totalLength) {
    let cnt = total[i];
    let flag = true;
    for (let j = 0; j < totalLength; j += 1) {
      console.log("i, j", i , j)
      const idx = ((i + j) % totalLength);
      const nextIdx = ((idx + 1) % totalLength);
      console.log("idx, nextIdx", idx, nextIdx)
      console.log("totalIdx: ", total[idx], "totalNextIdx: ", total[nextIdx])
      if (cnt < 0 || cnt + total[nextIdx] < 0) {
        flag = false;
        break;
      };
      cnt += total[nextIdx];
      console.log("결과: ", cnt)
    }
    if (flag && cnt >= 0) return i;
    i += 1;
  }
  return -1
 */