function solution(sticker) {
    const {length} = sticker;
    const cache1 = Array(length).fill(0);
    const cache2 = Array(length).fill(0);
    
    let max = Math.max(...sticker);
    
    if (length < 3) return max;
    
    cache2[0] = sticker[0];
    cache1[1] = sticker[1];
    cache2[1] = sticker[1];
    cache1[2] = sticker[2];
    cache2[2] = sticker[0] + sticker[2];
    for (let i = 3; i < length - 1; i++) {
        cache1[i] = Math.max(cache1[i - 2], cache1[i - 3]) + sticker[i];
		cache2[i] = Math.max(cache2[i - 2], cache2[i - 3]) + sticker[i];
    }
    cache1[length - 1] = Math.max(cache1[length - 3], length > 3 ? cache1[length - 4] : 0) + sticker[length - 1];
    max = Math.max(max, cache1[length - 1], cache2[length - 2], cache1[length - 2], cache1[length - 3], cache2[length - 3]);
    return max;
}