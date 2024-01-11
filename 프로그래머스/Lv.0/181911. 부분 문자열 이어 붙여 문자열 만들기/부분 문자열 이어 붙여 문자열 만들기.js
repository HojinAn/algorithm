function solution(my_strings, parts) {
    return my_strings.map((str, i) => {
        const [from, to] = parts[i];
        return str.slice(from, to + 1);
    }).join("");
}