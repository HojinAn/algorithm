function solution(myStr) {
    const ans = myStr.split(/[abc]/g).filter((s) => s);
    return ans.length ? ans : ['EMPTY'];
}