function solution(a, d, included) {
    return included.map((_, i) => a + i * d).filter((_, i) => included[i]).reduce((acc, no) => acc + no);
}