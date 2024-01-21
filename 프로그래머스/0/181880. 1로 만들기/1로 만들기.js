function countDivision(no, cnt) {
    if (no === 1) {
        return cnt;
    }
    if (no % 2) {
        return countDivision(no - 1, cnt);
    }
    return countDivision(no / 2, cnt + 1);
}
function solution(num_list) {
    return num_list.reduce((cnt, no) => countDivision(no, cnt), 0);
}