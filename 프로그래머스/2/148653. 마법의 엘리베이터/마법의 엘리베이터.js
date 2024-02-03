function solution(storey) {
    let ans = 0;
    while (storey > 0) {
        const remain = storey % 10;
        storey = Math.floor(storey / 10);
        if (remain > 5) {
            ans += 10 - remain;
            storey += 1;
        } else if (remain < 5) {
            ans += remain;
        } else {
            const tensDigit = storey % 10;
            if (tensDigit >= 5) {
                storey += 1;
            }
            ans += remain;
        }
    }
    return ans;
}