# 요약

결과적으로, `for`문 한 번에 풀어야 했던 해시 테이블 문제.

# 풀이 방법

먼저 맨 처음 문제를 보았을 때 제한 사항에 주목했다.

> record는 다음과 같은 문자열이 담긴 배열이며, 길이는 1 이상 100,000 이하이다.

따라서 이는 O(n) 이상이면 까다로울 수 있겠다는 생각이 들었고, 따라서 해시를 써야겠다고 생각했다.

이후 세부 풀이 과정은 다음과 같다.

1. 일단 핵심은 `id`이다. 닉네임이 바뀌더라도 `id`는 불변성이 유지되므로 각 `record`마다 기록에서의 `id`와 `status`를 체크하자.
2. 현재 `Leave`의 경우 `nickname`을 받지 않는다. 따라서 `nickname`이 있을 때에만 최신화시켜주자. 이를 `nicknames`에 넣어준다.
3. 어떤 채팅방의 알림을 `id`와 `status`로 받아낸 `alerts`를 구현하자. `alerts`의 키는 `idx`이며, 이는 `cnt`로 구현해냈다.
4. 따라서 `nicknames`에 있는 `{ id: nickname, ...}`으로부터 닉네임을 받아내, `result`에 하나씩 넣어주자.
5. `result`를 반환한다.

# 실제 코드
```js
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
```
