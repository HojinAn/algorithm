function solution(strArr) {
    return Math.max(...Object.values(strArr.reduce((counter, str) => ({ ...counter, [str.length]: (counter[str.length] ?? 0) + 1}), {})));
}