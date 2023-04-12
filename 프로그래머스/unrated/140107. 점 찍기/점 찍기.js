function solution(k, d) {
    let cnt = 0;
    for (let i = 0; i * k <= d; i++) {
        const diff = Math.floor(Math.floor(Math.sqrt(d ** 2 - (i * k) ** 2)) / k) + 1;
        cnt += diff > 0 ? diff : 0;
    }
    return cnt;
}