function solution(keymap, targets) {
    const INF = 1000;
    const keyCntMap = new Map('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((ch)=>[ch, INF]));
    keymap.forEach((str) => {
        for (let i = 0, len = str.length; i < len; i++) {
            const ch = str[i];
            keyCntMap.set(ch, Math.min(keyCntMap.get(ch), i + 1));
        }
    });
    
    return targets.map((target) => {
        let targetCnt = 0;
        for (const ch of target) {
            const cnt = keyCntMap.get(ch);
            if (cnt === INF) return -1;
            targetCnt += cnt;
        }
        return targetCnt;
    })
}