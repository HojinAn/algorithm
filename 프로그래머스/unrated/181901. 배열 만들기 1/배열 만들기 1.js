function solution(n, k) {
    return Array(Math.floor(n / k)).fill(k).map((x, i) => x * (i + 1));
}