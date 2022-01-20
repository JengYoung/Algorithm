const getTime = (time) => {
  const [hour, minutes] = time.split(":");
  return +hour * 60 + +minutes;
}

const calculateCost = (fees, inTime, outTime, totalTime) => {
  const [baseTime, baseCost, unitTime, unitCost] = fees;
  if (!inTime && !outTime) return totalTime > baseTime ? baseCost + Math.ceil((totalTime - baseTime) / unitTime) * unitCost : baseCost

  const timeDiff = getTime(outTime) - getTime(inTime);
  return ((timeDiff + totalTime >= baseTime) ? Math.ceil((timeDiff + totalTime - baseTime) / unitTime) * unitCost : 0 ) + baseCost
}

function solution(fees, records) {
  const infos = {};
  const endTime = '23:59'
  
  records.forEach(record => {
      const [time, carNumber, status] = record.split(' ');
      const nextInfo = { time, status, total: 0, totalTime: 0 }
      if (!infos[carNumber]) {
          infos[carNumber] = nextInfo
      } else {
          const memo = { ...infos[carNumber] }
          infos[carNumber] = {
              time,
              status,
              total: 0,
              totalTime: memo.totalTime + (status === 'OUT' ? getTime(time) - getTime(memo.time) : 0)
          }
      }
  })
  for (const carNumber in infos) {
      const info = infos[carNumber];
      if (info.status === 'IN') {
          infos[carNumber] = {
              ...info,
              status: 'OUT',
              total: info.total + (info.status === 'IN' ? calculateCost(fees, info.time, endTime, infos[carNumber].totalTime) : 0)
          }
      } else {
          infos[carNumber] = {
              ...info,
              total: calculateCost(fees, null, null ,infos[carNumber].totalTime)
          }
      }
  }
  
  const answer = Object.entries(infos).sort((a, b) => a[0] - b[0]).map(([key, value]) => value.total)
  return answer;
}
