import * as fs from "fs";
const [line, ...input] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let TC = +line.trim(),
  idx = 0,
  l: number,
  map: number[][],
  from: number[],
  to: number[],
  answer = "";
const delta = [
  [-1, -2],
  [-2, -1],
  [-2, 1],
  [-1, 2],
  [1, 2],
  [2, 1],
  [2, -1],
  [1, -2],
];
const rangeCheck = (r: number, c: number) => {
  return 0 <= r && r < l && 0 <= c && c < l;
};
const bfs = () => {
  const q: number[][] = [];
  let qIdx = 0,
    qSize = 0,
    r: number,
    c: number,
    nR,
    nC,
    cnt;
  q[qSize++] = [...from, 0];
  map[from[0]][from[1]] = 1;
  while (qIdx < qSize) {
    [r, c, cnt] = q[qIdx++];
    if (r === to[0] && c === to[1]) {
      answer += `${cnt}\n`;
      break;
    }
    delta.forEach((el) => {
      nR = r + el[0];
      nC = c + el[1];
      rangeCheck(nR, nC) &&
        !map[nR][nC] &&
        (() => {
          map[nR][nC] = 1;
          q[qSize++] = [nR, nC, cnt + 1];
        })();
    });
  }
};
while (TC--) {
  l = +input[idx++].trim();
  map = [...Array(l)].map(() => Array(l).fill(0));
  from = input[idx++].trim().split(" ").map(Number);
  to = input[idx++].trim().split(" ").map(Number);
  bfs();
}
console.log(answer.trim());
