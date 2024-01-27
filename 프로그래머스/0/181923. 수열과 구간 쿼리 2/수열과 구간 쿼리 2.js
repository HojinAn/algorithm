function solution(arr, queries) {
    const INF = 100000001;
    return queries.reduce((result, [s, e, k]) => {
        let el = INF;
        for (let i = s; i <= e; i++) {
            if (k < arr[i] && arr[i] <= el) {
                el = arr[i];
            }
        }
        result.push(el === INF ? -1 : el);
        return result;
    }, []);
}