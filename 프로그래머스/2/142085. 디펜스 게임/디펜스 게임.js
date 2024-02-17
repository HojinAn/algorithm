function solution(n, k, enemy) {
    let l = 0;
    let r = enemy.length - 1;
    const isDefensible = (mid) => {
        const arr = enemy.slice(0, mid + 1).sort((a, b) => b - a).slice(k);
        return arr.reduce((rest, cnt) => rest - cnt, n) >= 0;
    };
    while (l <= r) {
        const mid = Math.ceil((l + r) / 2);
        console.log(l, r, mid);
        if (isDefensible(mid)) {
            l = mid + 1;
        } else {
            r = mid - 1;
        }
    }
    return l;
}