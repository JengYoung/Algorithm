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

const cpdomains = [
  "900 google.mail.com",
  "50 yahoo.com",
  "1 intel.mail.com",
  "5 wiki.org",
];
console.log(subdomainVisits(cpdomains));

/*
  ["901 mail.com","50 yahoo.com","900 google.mail.com","5 wiki.org","5 org","1 intel.mail.com","951 com"]
*/
