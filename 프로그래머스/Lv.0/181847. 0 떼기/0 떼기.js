function solution(n_str) {
    if (n_str[0] !== "0") {
        return n_str;
    }
    return solution(n_str.slice(1));
}