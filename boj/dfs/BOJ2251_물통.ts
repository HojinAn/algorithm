import * as fs from "fs";
const [A, B, C] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

const answer = new Set<number>();
const visited = [...Array(A + 1)].map(() => Array(B + 1).fill(false));

const dfs = (a: number, b: number, c: number) => {
  if (visited[a][b]) return;
  a === 0 && answer.add(c);
  visited[a][b] = true;
  c + a > A ? dfs(A, b, c + a - A) : dfs(c + a, b, 0);
  c + b > B ? dfs(a, B, c + b - B) : dfs(a, b + c, 0);
  a + b > A ? dfs(A, b + a - A, c) : dfs(a + b, 0, c);
  b + c > C ? dfs(a, b + c - C, C) : dfs(a, 0, b + c);
  a + c > C ? dfs(a + c - C, b, C) : dfs(0, b, a + c);
  a + b > B ? dfs(a + b - B, B, c) : dfs(0, a + b, c);
};

dfs(0, 0, C);

console.log(
  Array.from(answer)
    .sort((a, b) => a - b)
    .join(" ")
);
