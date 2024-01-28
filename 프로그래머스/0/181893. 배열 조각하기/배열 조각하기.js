function solution(arr, query) {
    return query.reduce((result, q, idx) => {
        if (idx % 2) {
            return result.slice(q);
        }
        return result.slice(0, q + 1);
    }, arr);
}