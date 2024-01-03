function solution(num_list) {
    return num_list.sort((a, b) => b - a).slice(0, num_list.length - 5).sort((a, b) => a - b);
}