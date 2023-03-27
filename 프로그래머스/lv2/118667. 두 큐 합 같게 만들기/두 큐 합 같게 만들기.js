function solution(queue1, queue2) {
    const sum = (acc, no) => acc + BigInt(no);
    
    let sum1 = queue1.reduce(sum, 0n);
    let sum2 = queue2.reduce(sum, 0n);
    const half = (sum1 + sum2) / 2n;
    
    const queue = [...queue1, ...queue2];
    const HALF_LEN = queue1.length;
    const TOTAL_LEN = 2 * HALF_LEN;
	
    let l = 0, r = HALF_LEN;
    
    let cnt = 0;
    
    while (l !== r && l < TOTAL_LEN && r !== HALF_LEN - 1) {
        if (sum1 > sum2) {
            const no = BigInt(queue[l++]);
            sum1 -= no;
            sum2 += no;
            cnt++;
        } else if (sum1 < sum2) {
            const no = BigInt(queue[r++]);
            r %= TOTAL_LEN;
            sum1 += no;
            sum2 -= no;
            cnt++;
        } else {
            return cnt;
        }
    }
    return -1;
}