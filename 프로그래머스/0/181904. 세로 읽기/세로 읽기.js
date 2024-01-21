function solution(my_string, m, c) {
    return [...Array(Math.ceil(my_string.length / m))].map((_, i) => my_string.slice(i * m, (i + 1) * m)).map((str) => str[c - 1]).join("");
}