function countDivision(cnt, no) {
    if (no === 1) {
        return cnt;
    }
    if (no % 2) {
        return countDivision(cnt, no - 1);
    }
    return countDivision(cnt + 1, no / 2);
}
function solution(num_list) {
    return num_list.reduce(countDivision, 0);
}