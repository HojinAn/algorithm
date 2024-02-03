function solution(storey) {
    if (storey < 5) {
        return storey;
    }
    const remain = storey % 10;
    const share = Math.floor(storey / 10);
    return Math.min(remain + solution(share), 10 - remain + solution(share + 1));
}