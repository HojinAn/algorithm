function solution(arr, queries) {
    return queries.reduce((result, [from, to]) => {
        [result[from], result[to]] = [result[to], result[from]];
        return result;
    }, arr);
}