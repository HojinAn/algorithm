function solution(cap, n, deliveries, pickups) {
    const stackReducer = (stack, no, i) => {
        no && stack.push([no, i + 1]);
        return stack;
    }
    const deliStack = deliveries.reduce(stackReducer, [])
    const pickStack = pickups.reduce(stackReducer, []);
    let movingDist = 0;
    
    while (1) {
        let deliCnt = cap;
        let pickCnt = cap;
        const deliSize = deliStack.length;
        const pickSize = pickStack.length;
        
        if (deliSize === 0 && pickSize === 0) break;
        movingDist += 2 * Math.max(deliSize ? deliStack[deliSize - 1][1] : 0, pickSize ? pickStack[pickSize - 1][1] : 0);
        
        while (deliStack.length) {
        	const [cnt, idx] = deliStack.pop();
            const diff = cnt - deliCnt;
            if (diff > 0) {
                deliStack.push([diff, idx])
                break;
            }
            deliCnt -= cnt;
        }
        while (pickStack.length) {
        	const [cnt, idx] = pickStack.pop();
            const diff = cnt - pickCnt;
            if (diff > 0) {
                pickStack.push([diff, idx])
                break;
            }
            pickCnt -= cnt;
        }
    }
    
    return movingDist;
}