function solution(num_list) {
    return num_list.reduce(([odd, even], n) => n % 2 ? [odd, even + n] : [odd + n, even], ["", ""]).map(Number).reduce((s, n) => s + n);
}