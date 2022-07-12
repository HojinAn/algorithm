import * as fs from "fs";
const [input1, ...input2] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const [n, m] = input1.trim().split(" ").map(Number);
const paper = input2.map((el) => el.trim().split(" ").map(Number));
const visited: boolean[][] = [...Array(n)].map(() => Array(m).fill(false));
const delta = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
  [0, 1],
];
let answer = 0;
const rangeCheck = (r: number, c: number) => 0 <= r && r < n && 0 <= c && c < m;

const dfs = (r: number, c: number, cnt: number, accum: number) => {
  if (cnt >= 3) {
    answer = Math.max(answer, accum);
    return;
  }
  delta.slice(0, 4).forEach((el) => {
    const [nR, nC] = [r + el[0], c + el[1]];
    if (rangeCheck(nR, nC) && !visited[nR][nC]) {
      visited[nR][nC] = true;
      dfs(nR, nC, cnt + 1, accum + paper[nR][nC]);
      visited[nR][nC] = false;
    }
  });
};
const bfs = (r: number, c: number, no: number, accum: number) => {
  delta.slice(no, no + 3).forEach((el) => {
    const [nR, nC] = [r + el[0], c + el[1]];
    rangeCheck(nR, nC) && (accum += paper[nR][nC]);
  });
  answer = Math.max(accum, answer);
};
paper.forEach((li, r) => {
  li.forEach((el, c) => {
    visited[r][c] = true;
    dfs(r, c, 0, el);
    visited[r][c] = false;
    for (let i = 0; i < 4; i++) bfs(r, c, i, el);
  });
});
console.log(answer);
