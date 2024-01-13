function solution(my_string) {
    return my_string.split(" ").map((s) => s.trim()).filter((s) => s !== "");
}