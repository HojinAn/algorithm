function solution(cap, n, deliveries, pickups) {
    const deliStack = deliveries.reduce((st, cnt, i) => {
        cnt && st.push([cnt, i + 1]);
        return st;
    }, [])
    const pickStack = pickups.reduce((st, cnt, i) => {
        cnt && st.push([cnt, i + 1]);
        return st;
    }, [])
    let ans = 0 ;
    while (1) {
        const deliLen = deliStack.length;
        const pickLen = pickStack.length;
        if (!deliLen && !pickLen) break;
        ans += 2 * Math.max(
            deliLen ? deliStack[deliLen - 1][1] : 0,
            pickLen ? pickStack[pickLen - 1][1] : 0
        );
        let deliCnt = 0;
        while (deliCnt <= cap && deliStack.length) {
            const [cnt, idx] = deliStack.pop();
            if (cnt + deliCnt > cap) deliStack.push([deliCnt + cnt - cap, idx]);
            deliCnt += cnt;
        }
        let pickCnt = 0;
        while (pickCnt <= cap && pickStack.length) {
            const [cnt, idx] = pickStack.pop();
            if (cnt + pickCnt > cap) pickStack.push([pickCnt + cnt - cap, idx]);
            pickCnt += cnt;
        }
    }
    return ans;
}