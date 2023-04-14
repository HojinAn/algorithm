function solution(sequence, k) {
    let [resL, resR] = [0, 0];
    let l = 0;
    let r = 0;
    const n = sequence.length;
    let min = n + n;
    let sum = sequence[0];
    while (l < n && r < n) {
        if (sum < k) sum += sequence[++r];
        else if (sum > k) sum -= sequence[l++];
        else {
            const diff = r - l + 1;
            if (min > diff) {
                min = diff;
                [resL, resR] = [l, r];
            }
            sum += sequence[++r];
        }
    }
    return [resL, resR];
}