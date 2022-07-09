import * as fs from "fs";
const [input1, ...input2] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const [n, m] = input1.trim().split(" ").map(Number),
  map = input2.map((el) => el.trim().split("").map(Number)),
  cMap = [...Array(n)].map(() => [...Array(m)]),
  delta = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];
let answer = "",
  type = 1;
const rangeCheck = (r: number, c: number) => 0 <= r && r < n && 0 <= c && c < m;
const bfs = (r: number, c: number) => {
  const q: number[][] = [];
  let qSize = 0,
    qIdx = 0,
    nR: number,
    nC: number,
    cR: number,
    cC: number;
  q[qSize++] = [r, c];
  map[r][c] = 1;
  while (qIdx < qSize) {
    [cR, cC] = q[qIdx++];
    delta.forEach((el) => {
      [nR, nC] = [cR + el[0], cC + el[1]];
      rangeCheck(nR, nC) &&
        !map[nR][nC] &&
        ((map[nR][nC] = 1), (q[qSize++] = [nR, nC]));
    });
  }
  qSize %= 10;
  q.forEach((el) => {
    cMap[el[0]][el[1]] = [type, qSize];
    map[el[0]][el[1]] = 0;
  });
  return [type++, qSize];
};
const getCnt = (r: number, c: number) => {
  let nR: number, nC: number;
  const visited: boolean[] = [];
  let ret = 1,
    cnt = 0;
  delta.forEach((el) => {
    [nR, nC] = [r + el[0], c + el[1]];
    if (rangeCheck(nR, nC)) {
      [type, cnt] = cMap[nR][nC];
      !visited[type] && ((visited[type] = true), (ret += cnt));
    }
  });
  return ret;
};
map.forEach((li, r) =>
  li.forEach((el, c) => !cMap[r][c] && (cMap[r][c] = el ? [0, 0] : bfs(r, c)))
);
map.forEach((li, r) => {
  li.forEach((el, c) => (el ? (answer += getCnt(r, c) % 10) : (answer += "0")));
  answer += "\n";
});
console.log(answer.trim());
