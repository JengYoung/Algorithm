const getTime = (time) => {
  return time
    .split(':')
    .reduce((acc, cur, index) => acc + (!index ? 60 * +cur : +cur), 0);
};

function solution(plans) {
  const result = [];

  const sortedPlans = plans
    .map(([name, time, period]) => [name, getTime(time), +period])
    .sort((a, b) => a[1] - b[1]);

  const stack = [];

  sortedPlans.forEach((plan, index) => {
    let breakTime = index > 0 ? plan[1] - sortedPlans[index - 1][1] : 0;

    while (stack.length) {
      const [nowName, nowTime, nowPeriod] = stack.pop();

      const remainTime = nowPeriod - breakTime;

      if (remainTime <= 0) {
        breakTime -= nowPeriod;
        result.push(nowName);
      } else {
        stack.push([nowName, nowTime, remainTime]);
        break;
      }
    }

    stack.push(plan);
  });

  while (stack.length) {
    const now = stack.pop();
    result.push(now[0]);
  }

  return result;
}
