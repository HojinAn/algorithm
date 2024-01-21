function solution(myString, pat) {
    return [...myString].reduce((cnt, _, i) => myString.slice(i, i + pat.length) === pat ? cnt + 1 : cnt, 0);
}