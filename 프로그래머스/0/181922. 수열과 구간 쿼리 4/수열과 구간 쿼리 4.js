function solution(arr, queries) {
    return queries.reduce((ans, [s, e, k]) => {
        for (let i = s; i <= e; i++) {
            i % k || ans[i]++;
        }
        return ans;
    }, arr);
}