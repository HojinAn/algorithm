import * as fs from "fs";
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let idx = 0,
  m: number,
  n: number,
  k: number,
  map: number[][],
  answer = "",
  nR,
  nC,
  TC = +input[idx++].trim();
const delta = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ],
  rangeCheck = (r: number, c: number) => {
    return 0 <= r && r < n && 0 <= c && c < m;
  },
  dfs = (map: number[][], r: number, c: number) => {
    delta.forEach((el) => {
      nR = r + el[0];
      nC = c + el[1];
      if (rangeCheck(nR, nC) && map[nR][nC]) {
        map[nR][nC] = 0;
        dfs(map, nR, nC);
      }
    });
    return 1;
  };
while (TC--) {
  [m, n, k] = input[idx++].trim().split(" ").map(Number);
  let x: number,
    y: number,
    cnt = 0;
  map = [...Array(n)].map(() => Array(m).fill(0));
  input.slice(idx, idx + k).forEach((el) => {
    [x, y] = el.trim().split(" ").map(Number);
    map[y][x] = 1;
  });
  map.forEach((r, y) => r.forEach((el, x) => el && dfs(map, y, x) && cnt++));
  answer += `${cnt}\n`;
  idx += k;
}
console.log(answer.trim());
