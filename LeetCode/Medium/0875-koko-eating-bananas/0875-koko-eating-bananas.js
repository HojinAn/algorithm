/**
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 * O(h)
 */
function minEatingSpeed(piles, h) {
    piles.sort((a, b) => a - b);
    
    let l = 0;
    let r = Math.max(...piles) + 1;
    while (l < r) {
        const mid = Math.floor((l + r) / 2);
        const cnt = piles.reduce((cnt, pile) => cnt + Math.ceil(pile / mid), 0);
        if (h >= cnt) r = mid;
        else l = mid + 1;
    }
    return l;
};