function solution(n) {
  return n
    .toString(3)
    .split("")
    .reduce((acc, cur, i) => acc + +cur * 3 ** i, 0);
}
function solution(n) {
  return parseInt(n.toString(3).split("").reverse().join(""), 3);
}
