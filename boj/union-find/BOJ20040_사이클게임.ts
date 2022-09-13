import * as fs from "fs";
const [[n, m], ...pairs] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.trim().split(" ").map(Number));
const parents = [...Array(n)].map((_, i) => i);
const findRoot = (no: number) => {
  if (no === parents[no]) return parents[no];
  return (parents[no] = findRoot(parents[no]));
};
const union = (a: number, b: number) => {
  const aRoot = findRoot(a);
  const bRoot = findRoot(b);
  if (aRoot === bRoot) return false;
  aRoot < bRoot ? (parents[bRoot] = aRoot) : (parents[bRoot] = aRoot);
  return true;
};
let ans = 0;
pairs.forEach(([a, b], i) => union(a, b) || ans || (ans = i + 1));
console.log(ans);
