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

  const queue = [];

  sortedPlans.forEach((plan) => {
    if (!queue.length) {
      queue.push(plan);
      return;
    }

    const [lastName, lastTime, lastPeriod] = queue[0];
    const [planName, planTime, planPeriod] = plan;

    if (lastTime + lastPeriod <= planTime) {
      queue.shift();
      result.push(lastName);
      queue.push(plan);
      return;
    }

    queue.shift();
    stack.push(lastName);
    queue.push(plan);
  });

  while (queue.length) {
    const plan = queue.shift();
    result.push(plan[0]);
  }

  while (stack.length) {
    result.push(stack.pop());
  }

  return result;
}
