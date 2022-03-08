/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
 const checkInclusion = (s1, s2) => {
    let start = 0; 
    let end = 0;

    const counts = {};
    for (let i = 0; i < s1.length; i += 1) {
        const now = s1[i];
        counts[now] = (counts[now] ?? 0) + 1
    }

    for (let i = 0; i < s1.length; i += 1) {
        if (counts[s2[i]] !== undefined) {
            counts[s2[i]] -= 1;
        }
    }

    end = s1.length - 1;
    
    while (end < s2.length) {
        if (Object.values(counts).every(v => v === 0)) return true;

        if (counts[s2[start]] !== undefined) {
            counts[s2[start]] += 1;
        }

        if (end + 1 < s2.length && counts[s2[end + 1]] !== undefined) {
            counts[s2[end + 1]] -= 1;
        }

        start += 1;
        end += 1;
    }


    return false;
};

(() => {
    const s1 = "ab"
    const s2 = "eidbaooo"

    console.log(checkInclusion(s1, s2))
})();

(() => {
    const s1 = "ab"
    const s2 = "eidboaoo"

    console.log(checkInclusion(s1, s2))
})();

(() => {
    const s1 = "a"
    const s2 = "ab"

    console.log(checkInclusion(s1, s2))
})();

(() => {
    const s1 = "adc"
    const s2 = "dcda"

    console.log(checkInclusion(s1, s2))
})();
