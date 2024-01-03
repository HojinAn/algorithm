function solution(start, end_num) {
    return [...Array(start - end_num + 1)].map((_, i) => start - i);
}