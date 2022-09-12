function solution(s) {
  const counter = new Map();
  s.match(/\d+/g).forEach((el) => {
    const val = counter.get(el);
    val ? counter.set(el, val + 1) : counter.set(el, 1);
  });
  return [...counter.entries()].sort((a, b) => b[1] - a[1]).map((el) => +el[0]);
}
