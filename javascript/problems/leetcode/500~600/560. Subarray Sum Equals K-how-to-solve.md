# 시작하며 🌈
> 코딩테스트 스터디에서 풀이과정을 씀. [링크](https://www.notion.so/hysoung/76b0f59af9dd4765b7899b58bfabb5d9?p=5d3c9ad6310c46d39a92760d15a8e71f)

처음에는 투포인터를 썼다가 틀렸읍니다... 왜냐하면 음수가 있는 줄 몰랐기 때문이었죠.

```jsx
const subarraySum = function (nums, k) {
  let result = 0;
  let [left, right] = [0, 0];
  let nowSum = nums[0];
  while (left <= right) {
    if (nowSum <= k) {
      if (nowSum === k) result += 1;
      right += 1;
      nowSum += nums[right] ?? 0;
    } else if (nowSum > k) {
      nowSum -= nums[left];
      left += 1;
    }
  }
  return result;
};
```

그래서! 해시테이블 + 구간합의 콜라보를 이용했어요.

# 풀이 과정

일단 해시 테이블이니, `map`을 써보았어요.

일단 이 문제 역시 `brute force`로 풀기는 뭔가 아쉬웠어요. 따라서 `for`문 하나로 풀 수 있는 방법을 고민했어요.

그래서 핵심은 **구간 합을 사용하자**였습니다. 

만약에 `[1,2,3,4,5]` 라는 배열 데이터가 있다고 해봅시다.

그렇다면 현재 3에서 5까지의 합은 어떻게 구할까요?

3 + 4 + 5겠죠?

그런데, 저 3의 위치가, 5의 위치가 일정하지 않다면 어떨까요? 무조건적으로 해당 합을 구할 때마다 for문을 써야 합니다.

그럴 때 우리는 이런 점화식을 쓸 수 있어요. 

<aside>
💡 n-2 에서 n까지의 합은 `Sum(0, n) - Sum(0, n -2)`이다

</aside>

즉 구간을 구할 때의 합을 미리 저장해주면서, 이를 계속해서 불러 쓰는 거에요.

그렇다면 우리가 만약 합이 k인 것을 구할 때에는 어떻게 하면 될까요?

우리는 **구간 합**을 알게 된다면, 다음과 같이 구할 수 있어요.

1. 지금까지 나왔던 구간 합 중에서 현재 구간 합 - k인 것을 찾는다.
2. 있으면 결국에 그만큼 더하면 되는 겁니당. 
    
    왜? `[현재 구간 합] - k = [이전 구간 합]` = `[현재 구간 합] - [이전 구간 합] = k`이므로.
    
3. 결과적으로 결과를 리턴합니다!

```jsx
const subarraySum = function (nums, k) {
  let result = 0;
  const map = new Map();
  map.set(0, 1);
  nums.reduce((acc, cur) => {
    const now = acc + cur;
    const checkNum = now - k;
    if (map.has(checkNum)) {
      result += map.get(checkNum);
    }
    map.set(now, (map.get(now) ?? 0) + 1);
    return now;
  }, 0);
  return result;
};

const nums = [1];
const k = 0;
console.log(subarraySum(nums, k));

```

# 마치며 👏🏻
예전에는 그냥 풀이 과정만 올렸는데, 생각해 보니, 나중에 다시 볼 때 어떻게 풀었는지 기억에 안 나는 경우가 많았다.  

앞으로는 문제의 정답도 중요하지만, 그 과정을 중요시하는 개발자가 되어야겠다. 이 해설은 그 효시이다.
