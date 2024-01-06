function solution(num_list) {
    const sum = (acc, n) => acc + n;
    const mul = (acc, n) => acc * n;
    return num_list.reduce(num_list.length >= 11 ? sum : mul);
}