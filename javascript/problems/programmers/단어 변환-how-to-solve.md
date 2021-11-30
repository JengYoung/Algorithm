# 단어 변환
## 사용 알고리즘
`BFS`
## 풀이 과정

1. 큐를 생성한다 (현재는 생산성을 위해 `array`로 구현)
2. `[시작한 단어, 단어의 리스트, 카운트]`를 큐에 넣는다.
3. 큐가 존재할 때까지 `while`문으로 돌린다.
4. 큐는 계속해서 맨 앞의 데이터를 `shift`하고, `now`와 `target`이 같으면 리턴한다.
5. `words`를 for문을 돌려서
6. 현재 `word`의 `j`번째와 `now`의 `j`번째가 다를 때마다 카운트를 늘린다.
7. 다 돌렸을 때 `diffCount`가 1과 같으면 바뀔 수 있는 단어이므로 `push`한다.
8. 이를 계속 반복하고, 만약 만족하지 않는다면 0을 리턴하는 과정을 설계했다.

```js
const solution = (begin, target, words) => {
  const q = [];
  const wordLength = begin.length;
  q.push([begin, words, 0]); // 바뀐 횟수
  while (q.length) {
    const [now, words, cnt] = q.shift();
    if (now === target) return cnt;
    for (let i = 0; i < words.length; i += 1) {
      const word = words[i];
      let diffCount = 0;
      for (let j = 0; j < wordLength; j += 1) {
        diffCount += word[j] !== now[j];
      }
      if (diffCount === 1) {
        q.push([word, words.filter((w) => w !== word), cnt + 1]);
      }
    }
  }
  return 0; // 바뀔 수 없음.
};
```
