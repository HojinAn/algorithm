function solution(n, answer = []) {
    if (n === 1) {
        return answer.concat(n)
    }
    return solution(n % 2 ? 3 * n + 1 : n / 2, answer.concat(n));
}