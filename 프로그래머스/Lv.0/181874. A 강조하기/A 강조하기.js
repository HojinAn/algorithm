function solution(myString) {
    return [...myString].map((s) => s.toLowerCase() === 'a' ? s.toUpperCase() : s.toLowerCase()).join("");
}