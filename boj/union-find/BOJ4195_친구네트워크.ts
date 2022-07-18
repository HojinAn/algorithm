import * as fs from "fs";
const [inp1, ...input] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
let parents: number[][],
  TC = +inp1,
  idx = 0,
  answer = "";
const find = (a: number) => {
  if (parents[a][0] === a) return a;
  return (parents[a][0] = find(parents[a][0]));
};
const union = (a: number, b: number) => {
  const aRoot = find(a);
  const bRoot = find(b);
  if (aRoot === bRoot) return parents[aRoot][1];
  if (aRoot < bRoot) {
    parents[bRoot][0] = aRoot;
    parents[aRoot][1] += parents[bRoot][1];
    return parents[aRoot][1];
  } else {
    parents[aRoot][0] = bRoot;
    parents[bRoot][1] += parents[aRoot][1];
    return parents[bRoot][1];
  }
};
while (TC--) {
  const f = +input[idx++],
    obj = {};
  let cnt = 1;
  parents = [...Array(2 * f + 1)].map((_, i) => [i, 1]);
  input.slice(idx, (idx += f)).forEach((el) => {
    const [f1, f2] = el.trim().split(" ");
    obj[f1] = obj[f1] || cnt++;
    obj[f2] = obj[f2] || cnt++;
    answer += `${union(obj[f1], obj[f2])}\n`;
  });
}
console.log(answer.trim());
