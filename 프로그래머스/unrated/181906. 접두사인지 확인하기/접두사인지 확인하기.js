function solution(my_string, is_prefix) {
    return is_prefix.split("").every((s, i) => s === my_string[i]) ? 1 : 0;
}