**생각보다 굉장히 원리는 간단했던 백트래킹 문제였다.**

## Ideation

생각을 해보자. 현재 제시된 문제의 수익 분배 구조 원리는 

<aside>
💡 **그저 다른 조건 없이, 타고 타고 루트까지 수익을 10%씩 분배하는 구조이다.**

</aside>

그렇다면, 첫째. 우리는 이 문제를 해결하기 위해 다음을 준비해야 한다.

- [ ]  **루트까지 이동할 수 있는 그래프를 형성할 수 있는가?**

그리고 수익 구조는 아래에서 → 위로 전달되는 구조이다. 따라서 이를 해결하기 위해 적합한 알고리즘이 있을까?

있다. 바로 재귀함수이다. 따라서 마치 Bottom-up의 방식으로 재귀함수를 돌려 

1. 루트까지 가거나, 
2. 더 이상 수익 분배가 불가능한 경우(돈이 10원 미만)일 경우에 백트래킹을 해주면 그만이다.

그렇다면 둘째. 우리는 이 문제를 해결하기 위해 이를 구현할 수 있어야 한다.

- [ ]  **Bottom-up의 방식으로 수익을 분배하기 위한 백트래킹 알고리즘 구현이 가능한가?**

## Division Conquer

우리는 이제 문제를 크게 2가지로 분할을 시킨 것이다.

- [ ]  **루트까지 이동할 수 있는 그래프를 형성할 수 있는가?**
- [ ]  **Bottom-up의 방식으로 수익을 분배하기 위한 백트래킹 알고리즘 구현이 가능한가?**
    - 수익 분배 방식 구현
    - 백트래킹 구현
    

자, 이제 하나씩 정복해나가면서, 결과를 도출해내면 이 문제는 해결할 수 있을 것이다.

## 그래프 만들기

- [x]  **루트까지 이동할 수 있는 그래프를 형성할 수 있는가?**

한 번 문제를 풀기 위한 기본 정보 초기화 세팅을 해주자. 나는 `getInitializedObjs`라는 메서드를 만들었다.

```jsx
const getInitializedObjs = (enroll, referral) => {
  const parents = {};
  const results = {}; // 최종 결과

  const enrollLength = enroll.length;
  for (let i = 0; i < enrollLength; i += 1) {
    const nowEnroll = enroll[i];
    const nowReferral = referral[i];
    parents[nowEnroll] = nowReferral;
    results[nowEnroll] = 0;
  }

  return { parents, results };
};
```

## 백트래킹 구현

### 수익 분배

우리는 계속해서 수익 분배를 해주어, 재귀함수에 전달시켜야 한다. 따라서 현재 노드에 90%의 수익을 분배할 수 있는 `getChargedMoney`라는 함수를 구현했다.

```jsx
const getChargedMoney = (money) => {
  return money < 10 ? money : money - Math.floor(money * 0.1);
};
```

### 백트래킹 구현

- [x]  **Bottom-up의 방식으로 수익을 분배하기 위한 백트래킹 알고리즘 구현이 가능한가?**
    - 수익 분배 방식 구현
    - 백트래킹 구현

그렇다면, 이제 우리는 계속해서 위로 올라가면서 수익 정산을 시켜줘야 한다.

이를 백트래킹으로 구현한다.

이때 가지치기 조건은 아까 위에 적었던 것처럼,

- 더이상 수익 분배가 불가능한 경우(돈이 10원 미만으로 남았을 경우)
- 루트까지 도달했을 경우

이다.

`backTracking`이라는 이름으로 한 번 만들어보자.

```jsx
const backTracking = (node, money, parents, results) => {
  const parent = parents[node];
	results[node] += getChargedMoney(money);
  if (parent === "-" || getChargedMoney(money) < 1) return;
  backTracking(parent, money - getChargedMoney(money), parents, results);
};
```

이제 위의 2가지 조건에 해당된다면 더하기만 하고 리턴을, 아니라면 계속해서 재귀함수로 루트까지 탐색할 것이다.

## 결과 반환

이제 다 왔다. 그러면, 결과를 내뱉어야 하는데, 결과 값은 보니까 `enroll`의 순서대로 정렬되어 있다. 이에 맞춰 반환하면 끝난다.

```jsx
const solution = (enroll, referral, seller, amount) => {
  const { parents, results } = getInitializedObjs(enroll, referral);

  const sellLength = seller.length;
  for (let i = 0; i < sellLength; i += 1) {
    backTracking(seller[i], amount[i] * 100, parents, results);
  }

  const answer = [];
  enroll.forEach((now) => {
    answer.push(results[now]);
  });
  return answer;
};
```

## 코드
```js
const getChargedMoney = (money) => {
  return money < 10 ? money : money - Math.floor(money * 0.1);
};

const getInitializedObjs = (enroll, referral) => {
  const parents = {};
  const results = {}; // 최종 결과

  const enrollLength = enroll.length;
  for (let i = 0; i < enrollLength; i += 1) {
    const nowEnroll = enroll[i];
    const nowReferral = referral[i];
    parents[nowEnroll] = nowReferral;
    results[nowEnroll] = 0;
  }

  return { parents, results };
};

const backTracking = (node, money, parents, results) => {
  const parent = parents[node];
  if (parent === "-" || getChargedMoney(money) < 1) {
    results[node] += getChargedMoney(money);
    return;
  }

  results[node] += getChargedMoney(money);
  backTracking(parent, money - getChargedMoney(money), parents, results);
};

const solution = (enroll, referral, seller, amount) => {
  const { parents, results } = getInitializedObjs(enroll, referral);

  const sellLength = seller.length;
  for (let i = 0; i < sellLength; i += 1) {
    backTracking(seller[i], amount[i] * 100, parents, results);
  }

  const answer = [];
  enroll.forEach((now) => {
    answer.push(results[now]);
  });
  return answer;
};
```

## 결과
어ㅡ썸하게 잘 풀었다!
![image](https://user-images.githubusercontent.com/78713176/145667145-5bdf5353-e9d4-45ef-85df-c39886e6ae4b.png)
