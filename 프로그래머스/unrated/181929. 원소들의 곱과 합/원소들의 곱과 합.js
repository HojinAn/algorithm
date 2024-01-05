function solution(num_list) {
    return +!!(num_list.reduce((mul, n) => mul * n) < (num_list.reduce((sum, n) => sum + n)) ** 2);
}