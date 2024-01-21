function solution(arr, queries) {
    return queries.reduce((result, [from, to]) => {
        for (let i = from; i <= to; i++) {
            result[i]++;
        }
        return result;
    }, arr);
}