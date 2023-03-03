/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
function strStr(haystack, needle) {
    const needleLen = needle.length;
    const hayLen = haystack.length;
    const checkSubstr = (idx) => [...haystack.slice(idx, idx + needleLen)].every((el, i)=>el===needle[i]);
    for (let i = 0, diff = hayLen - needleLen; i <= diff; i++) {
        if (checkSubstr(i)) return i;
    }
    return -1;
};