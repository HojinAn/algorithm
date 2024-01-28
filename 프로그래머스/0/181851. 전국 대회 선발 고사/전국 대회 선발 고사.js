function solution(rank, attendance) {
    return rank.map((r, i) => [r, attendance[i], i]).filter(([r, is, i]) => is).sort(([r1], [r2]) => r1 - r2).slice(0, 3).reduce((result, [r, is, no], idx) => {
        if (idx === 0) {
            return result + 10000 * no;
        }
        if (idx === 1) {
            return result + 100 * no;
        }
        if (idx === 2) {
            return result + no;
        }
        return result;
    }, 0);
}