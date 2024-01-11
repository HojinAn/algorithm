function solution(arr) {
    return arr.flatMap((n) => Array(n).fill(n));
}