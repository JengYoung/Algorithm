const solution = (user_id, banned_id) => {
  const q = [[[], [...user_id], [...banned_id]]]; // [현재 조건에 맞는 애들], [지금 남은 유저 애들], [지금 남은 밴 조건들]
  const obj = {};
  const resLength = banned_id.length;
  while (q.length) {
    const [cases, users, banUsers] = q.shift();
    if (!banUsers.length) {
      // [밴 조건이 없는 경우]
      const nowResult = cases.sort().join(""); // set을 위한 것
      obj[nowResult] = true;
      continue;
    }
    const banId = banUsers.pop();
    const nowUsers = [...users];
    nowUsers.forEach((userId) => {
      let flag = true;
      if (userId.length !== banId.length) return;
      for (let i = 0; i < banId.length; i += 1) {
        if (flag && banId[i] !== "*" && banId[i] !== userId[i]) {
          flag = false;
        }
      }
      if (flag) {
        q.push([
          [...cases, userId],
          nowUsers.filter((id) => userId !== id),
          [...banUsers],
        ]);
      }
    });
  }

  return Object.keys(obj).length;
};
