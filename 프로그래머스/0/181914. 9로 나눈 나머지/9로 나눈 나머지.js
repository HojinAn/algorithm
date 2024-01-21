function solution(number) {
    return number.split('').map(Number).reduce((acc, no) => acc + no) % 9;
}