import * as fs from "fs";
const [[k], tmp] = fs
    .readFileSync("/dev/stdin")
    .toString()
    .trim()
    .split("\n")
    .map((el) => el.trim().split(" ").map(Number)),
  order = [0, ...tmp],
  nodes: number[][] = [...Array(k)].map(() => []),
  limit = 2 ** k - 1;
let idx = 1;
const dfs = (depth: number, num: number) => {
  let next = 2 * num;
  next <= limit && dfs(depth + 1, next);
  nodes[depth].push(order[idx++]);
  next++;
  next <= limit && dfs(depth + 1, next);
};
dfs(0, 1);
console.log(
  nodes
    .reduce(
      (accLi, curLi) =>
        (accLi += `${curLi
          .reduce((acc, cur) => (acc += ` ${cur}`), "")
          .trim()}\n`),
      ""
    )
    .trim()
);
