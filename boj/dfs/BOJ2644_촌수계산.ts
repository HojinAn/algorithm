import * as fs from "fs";
const [str1, str2, str3, ...str4] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const [n, [from, to]] = [+str1, str2.trim().split(" ").map(Number)],
  parents: number[] = Array(n + 1).fill(0),
  children: number[][] = [...Array(n + 1)].map(() => []),
  visited: boolean[] = Array(n + 1).fill(false);
let answer = -1;
str4.forEach((el) => {
  const [prnt, chld] = el.trim().split(" ").map(Number);
  parents[chld] = prnt;
  children[prnt].push(chld);
});
const dfs = (no: number, depth: number) => {
  if (no === to) {
    answer = depth;
    return;
  }
  const parent = parents[no];
  !visited[parent] && (visited[parent] = true) && dfs(parent, depth + 1);
  children[no].forEach(
    (child) =>
      !visited[child] && (visited[child] = true) && dfs(child, depth + 1)
  );
};
[visited[0], visited[from]] = [true, true];
dfs(from, 0);
console.log(answer);
