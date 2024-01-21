function solution(str1, str2) {
    return str1.split("").map((s, i) => s + str2[i]).join("");
}