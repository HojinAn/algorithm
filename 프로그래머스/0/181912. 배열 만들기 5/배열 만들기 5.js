function solution(intStrs, k, s, l) {
    return intStrs.map((str) => str.slice(s, s + l)).map(Number).filter((no) => no > k);
}