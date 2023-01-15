import * as fs from "fs";
const [n, ...nums] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

const table = [0, ...nums];
const visited = Array(n + 1).fill(false);
const ans = new Set<number>();

const judgeCircular = (start: number) => {
  const dfs = (depth: number, no: number, arr: number[]) => {
    if (depth && start === no) {
      arr.forEach((el) => ans.add(el));
      return true;
    }
    const next = table[no];
    if (!visited[next]) {
      visited[next] = true;
      if (dfs(depth + 1, next, arr.concat(next))) return true;
      visited[next] = false;
    }
    return false;
  };
  dfs(0, start, [start]);
  visited[start] = true;
};

for (let i = 1; i <= n; i++) visited[i] || judgeCircular(i);

console.log(ans.size);
console.log(
  Array.from(ans)
    .sort((a, b) => a - b)
    .join("\n")
);
