function solution(n) {
    return [...Array(n)].map((_, i) => [...Array(n)].map((_, j) => i === j ? 1 : 0));
}