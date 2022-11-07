import * as fs from "fs";
const [str1, ...input] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const [n, m, k] = str1.trim().split(" ").map(Number);
const floor = [...Array(n)].map(() => Array(m).fill(0));
const visited = [...Array(n)].map(() => Array(m).fill(false));
input.forEach((str) => {
  const [r, c] = str.trim().split(" ").map(Number);
  floor[r - 1][c - 1] = 1;
});
const delta = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];
let max = 0;
let cnt = 0;
const checkIsInRange = (r: number, c: number) =>
  0 <= r && r < n && 0 <= c && c < m;
const dfs = (r: number, c: number) => {
  cnt++;
  delta.forEach(([dr, dc]) => {
    const [nr, nc] = [r + dr, c + dc];
    if (checkIsInRange(nr, nc) && floor[nr][nc] && !visited[nr][nc]) {
      visited[nr][nc] = true;
      dfs(nr, nc);
    }
  });
  max = Math.max(max, cnt);
};
floor.forEach((line, r) =>
  line.forEach((sqr, c) => {
    if (sqr && !visited[r][c]) {
      visited[r][c] = true;
      cnt = 0;
      dfs(r, c);
    }
  })
);
console.log(max);
