import * as fs from "fs";
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [n, m] = input[0].trim().split(" ").map(Number),
  map = input.slice(1).map((el) => el.trim().split("").map(Number)),
  q: number[][] = [],
  delta = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ],
  rangeCheck = (r: number, c: number) => {
    return 0 <= r && r < n && 0 <= c && c < m;
  };
let qSize = 0,
  qIdx = 0,
  r,
  c,
  cnt,
  nR,
  nC,
  answer = 0;

q[qSize++] = [0, 0, 1];
map[0][0] = 0;
while (!answer && qIdx < qSize) {
  [r, c, cnt] = q[qIdx++];
  delta.forEach((el) => {
    nR = r + el[0];
    nC = c + el[1];
    rangeCheck(nR, nC) &&
      map[nR][nC] &&
      (() => {
        map[nR][nC] = 0;
        q[qSize++] = [nR, nC, cnt + 1];
        return 1;
      })() &&
      nR === n - 1 &&
      nC === m - 1 &&
      (answer = cnt + 1);
  });
}
console.log(answer);
