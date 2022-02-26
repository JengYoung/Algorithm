const getSeconds = (time) => {
  const timeArr = time.split(":").map((val) => parseInt(val));
  return timeArr[0] * 3600 + timeArr[1] * 60 + timeArr[2] * 1;
};

const parseTime = (num) => {
  const hours = parseInt(num / 3600);
  const minutes = parseInt((num - hours * 3600) / 60);
  const seconds = num % 60;

  const convertFormat = (number) => (number < 10 ? `0${number}` : number);

  return `${convertFormat(hours)}:${convertFormat(minutes)}:${convertFormat(
    seconds
  )}`;
};

const solution = (play_time, adv_time, logs) => {
  const playSeconds = getSeconds(play_time);
  const advSeconds = getSeconds(adv_time);

  const arr = new Array(playSeconds + 1).fill(0);

  logs.forEach((log) => {
    const [start, end] = log.split("-").map((time) => getSeconds(time));

    arr[start] += 1;
    arr[end] -= 1;
  });

  for (let i = 1; i <= playSeconds; i += 1) {
    arr[i] += arr[i - 1];
  }

  for (let i = 1; i <= playSeconds; i += 1) {
    arr[i] += arr[i - 1];
  }

  let acc = arr[advSeconds];
  let result = 0;
  for (let i = 0; i <= playSeconds - advSeconds; i += 1) {
    if (arr[i + advSeconds] - arr[i] > acc) {
      acc = arr[i + advSeconds] - arr[i];
      result = i + 1;
    }
  }

  return parseTime(result);
};
