/**
 * @param {string[][]} accounts
 * @return {string[][]}
 */
var accountsMerge = function (accounts) {
  const accountsMap = new Map();

  // put email's owner in accounts' index
  const emailCache = new Map();

  let id = 0;

  accounts.forEach((account) => {
    const [name, ...emails] = account;

    const cachedEmails = emails.filter((email) => emailCache.has(email));

    if (cachedEmails.length) {
      const accountId = emailCache.get(cachedEmails[0]);
      const accountEmails = accountsMap.get(accountId).emails;

      if (!cachedEmails.every((email) => emailCache.get(email) === accountId)) {
        cachedEmails.forEach((email) => {
          const nowId = emailCache.get(email);

          if (nowId !== accountId) {
            const nowAccount = accountsMap.get(nowId);

            [...nowAccount.emails].forEach((e) => {
              emailCache.set(e, accountId);
              accountEmails.add(e);
            });

            accountsMap.delete(nowId);
          }
        });
      }

      emails.forEach((email) => {
        emailCache.set(email, accountId);

        accountEmails.add(email);
      });

      return;
    }

    const mapValue = {
      name,
      emails: new Set(),
    };

    emails.forEach((email) => {
      emailCache.set(email, id);

      mapValue.emails.add(email);
    });

    accountsMap.set(id, mapValue);

    id += 1;
  });

  return [...accountsMap.values()].map(({ name, emails }) => {
    const sortedEmails = [...emails].sort();

    return [name, ...sortedEmails];
  });
};
