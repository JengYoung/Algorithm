function solution(record) {
  const nicknames = {};
  const alerts = {};
  let cnt = 0;
  record.forEach((val) => {
    const [status, id, nickname] = val.split(" ");
    nicknames[id] = nickname ? nickname : nicknames[id];
    if (status !== "Change") {
      alerts[cnt] = { id, status };
      cnt += 1;
    }
  });
  const result = [];
  for (let i = 0; i < cnt; i += 1) {
    const { id, status } = alerts[i];
    result.push(
      `${nicknames[id]}님이 ${
        status === "Enter" ? "들어왔습니다." : "나갔습니다."
      }`
    );
  }
  return result;
}
