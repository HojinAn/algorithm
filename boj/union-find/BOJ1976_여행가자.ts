import * as fs from "fs";
const [str1, str2, ...str3] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const n = +str1,
  m = +str2,
  links = str3.slice(0, n).map((li) => li.trim().split(" ").map(Number)),
  [plan] = str3.slice(n).map((li) =>
    li
      .trim()
      .split(" ")
      .map((el) => +el - 1)
  ),
  parents = [...Array(n)].map((el, i) => i);
const findRoot = (a: number) => {
  if (parents[a] === a) return a;
  return (parents[a] = findRoot(parents[a]));
};
const union = (a: number, b: number) => {
  const aRoot = findRoot(a);
  const bRoot = findRoot(b);
  if (aRoot === bRoot) return false;
  if (aRoot < bRoot) parents[bRoot] = aRoot;
  else parents[aRoot] = bRoot;
  return true;
};
links.forEach((li, r) => li.forEach((el, c) => el && union(r, c)));
const group = parents[plan[0]];
let possible = true;
plan.forEach((el) => parents[el] !== group && (possible = false));
console.log(possible ? "YES" : "NO");
