const isPalindrome = (s, prevFront, prevRear) => {
  let front = prevFront || 0;
  let rear = prevRear || s.length - 1;

  while (rear >= front) {
    if (s[front] !== s[rear]) {
      return false;
    };
    front += 1;
    rear -= 1;
  }
  
  return true;
}

// const longestPalindrome = s => {
//   const INITIAL_STRING = s[0];
//   const palindromes = [[]];
//   palindromes.push([INITIAL_STRING]);

//   s.split('').forEach((val, idx) => {
//     if (idx) {
//       for (let i = 0; i < idx + 1; i += 2) {
//         const now = s.slice(idx - i, idx + 1);
//         if (isPalindrome(now)) {
//           if (palindromes[now.length]) {
//             if (!palindromes[now.length].includes(now)) palindromes[now.length].push(now)
//           } else {
//             palindromes[now.length] = [now]
//           }
//         }
//       }
//     }
//   })
  const longestPalindrome = s => {
    const INITIAL_STRING = s[0];
    const palindromes = [[]];
    palindromes.push([INITIAL_STRING]);
  
    s.split('').forEach((val, idx) => {
      if (idx) {
        for (let i = 0; i < idx + 1; i += 2) {
          const now = s.slice(idx - i, idx + 1);
          if (isPalindrome(now)) {
            if (palindromes[now.length]) {
              if (!palindromes[now.length].includes(now)) palindromes[now.length].push(now)
            } else {
              palindromes[now.length] = [now]
            }
          }
        }
      }
    })
  return palindromes[palindromes.length - 1][0];
}

(() => {
  const s = "babad";
  console.log(longestPalindrome(s))
})()