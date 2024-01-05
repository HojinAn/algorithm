function solution(my_string, alp) {
    return my_string.split("").map((s) => s === alp ? s.toUpperCase() : s).join("");
}