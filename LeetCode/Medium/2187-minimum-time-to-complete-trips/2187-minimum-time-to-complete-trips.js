/**
 * @param {number[]} time
 * @param {number} totalTrips
 * @return {number}
 */
function minimumTime (time, totalTrips) {
    const minTime = Math.min(...time);
    let l = 0;
    let r = totalTrips * minTime + 1;
    while (l < r) {
        const mid = Math.floor((l + r) / 2);
        const cntTrips = time.reduce((cnt, t) => cnt + Math.floor(mid / t), 0);
        if (cntTrips < totalTrips) l = mid + 1;
        else r = mid;
    }
    return r;
};