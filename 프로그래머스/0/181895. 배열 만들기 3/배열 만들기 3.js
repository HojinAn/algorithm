function solution(arr, intervals) {
    return intervals.map(([from, to]) => arr.slice(from, to + 1)).flat();
}