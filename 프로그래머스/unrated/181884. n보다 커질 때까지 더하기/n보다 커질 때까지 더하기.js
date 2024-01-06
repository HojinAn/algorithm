function solution(numbers, n) {
    return numbers.reduce((sum, no) => sum > n ? sum : sum + no, 0);
}