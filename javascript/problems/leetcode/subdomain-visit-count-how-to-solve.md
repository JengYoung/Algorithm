# 📄문제

[알고리즘 스터디 링크](https://www.notion.so/hysoung/Subdomain-Visit-Count-931c7067d6ec44f796f19b59e354edc5)

---

# ✏️풀이

- **재영**
    
    진짜 해시 문제였군요!
    
    이 역시 최대한 `for`문을 줄이려고 했지만, 결국 `O(n^2)`이 최대인 것 같았읍니다...!
    
    일단 정말 문제에서 요구한 대로 똑같이 풀었던 거 같네요.
    
    1. 도메인과 cp를 먼저 분리하자.
    2. 분리시킨 뒤에, 도메인도 `.` 기준으로 다 분리하자.
    3. 그런데 지금 뒷쪽에서부터 더한다. 
        - 따라서 기존 배열도 거꾸로 하면서,
        - `acc + cur` 부분을 거꾸로 해준다.
    4. 이제 해시를 계속해서 업데이트해준다.
    5. 결과를 반환할 때는 `map` 친구들을 다 꺼내와서, `map`으로 결과와 똑같은 형식으로 만들어주어 반환한다.
    
    ```jsx
    const subdomainVisits = function (cpdomains) {
      const map = new Map();
      cpdomains.forEach((cpdomain) => {
        const [cp, domain] = cpdomain.split(" ");
        const domainArr = domain.split(".");
        domainArr.reverse().reduce((acc, cur) => {
          const now = acc ? cur + "." + acc : cur;
          map.set(now, parseInt(map.get(now) ?? 0) + parseInt(cp));
          return now;
        }, "");
      });
      const result = [...map.entries()].map(([key, value]) => `${value} ${key}`);
      return result;
    };
    ```
    
    시간 복잡도도 괜찮게 나오네요. 굿!
