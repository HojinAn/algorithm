import * as fs from "fs";
const [[n, k], appliances] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.trim().split(" ").map(Number));
const priority: number[][] = [...Array(k + 1)].map(() => []);
const plugs: number[] = [];
let ans = 0;

appliances.forEach((el, i) => priority[el].push(i));
priority.forEach((_, i) => priority[i].sort((a, b) => b - a));

appliances.forEach((el) => {
  priority[el].pop();
  const idx = plugs.indexOf(el);
  if (idx === -1) {
    if (plugs.length >= n) {
      plugs.pop();
      ans++;
    }
    plugs.push(el);
  }
  plugs.sort((a, b) =>
    priority[a].length && priority[b].length
      ? priority[a][priority[a].length - 1] -
        priority[b][priority[b].length - 1]
      : priority[b].length - priority[a].length
  );
});
console.log(ans);
