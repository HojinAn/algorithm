/**
 * @param {number[]} flowerbed
 * @param {number} n
 * @return {boolean}
 */
function canPlaceFlowers(flowerbed, n) {
    const len = flowerbed.length;
    const cntArr = Array(len).fill(0);
    
    if (len > 1){
        if (!flowerbed[0] && !flowerbed[1]) cntArr[0] = 1;
    } else {
        cntArr[0] = !flowerbed[0] ? 1 : 0;
    }
    
    for (let i = 1; i < len - 1; i++) {
        cntArr[i] = !flowerbed[i - 1] && !flowerbed[i] && !flowerbed[i + 1] ? (cntArr[i - 2] ?? 0) + 1 : cntArr[i - 1];
    }
    
    if (len > 1) {
        cntArr[len - 1] = !flowerbed[len - 1] && !flowerbed[len - 2] ? (cntArr[len - 3] ?? 0) + 1 : cntArr[len - 2];
    }
    
    return cntArr[len - 1] >= n;
};