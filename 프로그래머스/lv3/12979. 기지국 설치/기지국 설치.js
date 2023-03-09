function solution(n, stations, w) {
    const range = 2 * w + 1;
    stations.push(n + w + 1);
    let lowerBound = -1;
    let upperBound = 0;
    return stations.reduce((cnt, station) => {
        lowerBound = station - w;
        const diff = lowerBound - upperBound - 1;
        cnt += Math.ceil(diff / range);
        upperBound = station + w;
        return cnt;
    }, 0)
}