# ๐๋ฌธ์ 

[์๊ณ ๋ฆฌ์ฆ ์คํฐ๋ ๋งํฌ](https://www.notion.so/hysoung/Subdomain-Visit-Count-931c7067d6ec44f796f19b59e354edc5)

---

# โ๏ธํ์ด

- **์ฌ์**
    
    ์ง์ง ํด์ ๋ฌธ์ ์๊ตฐ์!
    
    ์ด ์ญ์ ์ต๋ํ `for`๋ฌธ์ ์ค์ด๋ ค๊ณ  ํ์ง๋ง, ๊ฒฐ๊ตญ `O(n^2)`์ด ์ต๋์ธ ๊ฒ ๊ฐ์์๋๋ค...!
    
    ์ผ๋จ ์ ๋ง ๋ฌธ์ ์์ ์๊ตฌํ ๋๋ก ๋๊ฐ์ด ํ์๋ ๊ฑฐ ๊ฐ๋ค์.
    
    1. ๋๋ฉ์ธ๊ณผ cp๋ฅผ ๋จผ์  ๋ถ๋ฆฌํ์.
    2. ๋ถ๋ฆฌ์ํจ ๋ค์, ๋๋ฉ์ธ๋ `.` ๊ธฐ์ค์ผ๋ก ๋ค ๋ถ๋ฆฌํ์.
    3. ๊ทธ๋ฐ๋ฐ ์ง๊ธ ๋ท์ชฝ์์๋ถํฐ ๋ํ๋ค. 
        - ๋ฐ๋ผ์ ๊ธฐ์กด ๋ฐฐ์ด๋ ๊ฑฐ๊พธ๋ก ํ๋ฉด์,
        - `acc + cur` ๋ถ๋ถ์ ๊ฑฐ๊พธ๋ก ํด์ค๋ค.
    4. ์ด์  ํด์๋ฅผ ๊ณ์ํด์ ์๋ฐ์ดํธํด์ค๋ค.
    5. ๊ฒฐ๊ณผ๋ฅผ ๋ฐํํ  ๋๋ `map` ์น๊ตฌ๋ค์ ๋ค ๊บผ๋ด์์, `map`์ผ๋ก ๊ฒฐ๊ณผ์ ๋๊ฐ์ ํ์์ผ๋ก ๋ง๋ค์ด์ฃผ์ด ๋ฐํํ๋ค.
    
    ```jsx
    const subdomainVisits = function (cpdomains) {
      const map = new Map();
      cpdomains.forEach((cpdomain) => {
        const [cp, domain] = cpdomain.split(" "); 
        console.log(cp, domain)
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
    
    ์๊ฐ ๋ณต์ก๋๋ ๊ด์ฐฎ๊ฒ ๋์ค๋ค์. ๊ตฟ!
