function solution(n) {
    if (n % 2) {
        return [...Array((n + 1) / 2)].reduce((num, _, i) => num + (2 * i + 1), 0);
    }
    return [...Array(n / 2)].reduce((num, _, i)=> num + (2 * (i + 1)) ** 2, 0);
}