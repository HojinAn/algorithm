function solution(myString) {
    return [...myString].map((s) => s.localeCompare("l") < 0 ? "l" : s).join("");
}