import * as fs from "fs";
const [[n, m], ...map] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((li) => li.trim().split(" ").map(Number));
const virus: number[][] = [];
map.forEach((li, r) => li.forEach((el, c) => el === 2 && virus.push([r, c])));

const l = virus.length;
const copyMap = (map: number[][]) => JSON.parse(JSON.stringify(map));
const INF = 25000;
let min = INF;
const delta = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

const rangeCheck = (r: number, c: number) => 0 <= r && r < n && 0 <= c && c < n;

const isValid = (map: number[][]) => {
  for (let i = 0; i < n; i++)
    for (let j = 0; j < n; j++) if (!map[i][j]) return false;
  return true;
};

const bfs = (q: number[][]) => {
  const copiedMap = copyMap(map);
  q.forEach(([r, c]) => (copiedMap[r][c] = 3));
  let qSize = q.length,
    qIdx = 0,
    bfsMax = 0;
  while (qIdx < qSize) {
    const [cR, cC, cnt] = q[qIdx++];
    delta.forEach(([dR, dC]) => {
      const [nR, nC] = [cR + dR, cC + dC];
      if (rangeCheck(nR, nC))
        switch (copiedMap[nR][nC]) {
          case 0:
            bfsMax = Math.max(bfsMax, cnt + 1);
          case 2:
            copiedMap[nR][nC] = 3;
            q[qSize++] = [nR, nC, cnt + 1];
            break;
        }
    });
  }
  isValid(copiedMap) && (min = Math.min(min, bfsMax));
};

const combi = (cnt: number, start: number, visited: number) => {
  if (cnt === m) {
    const selected: number[][] = [];
    for (let i = 0; i < l; i++)
      if (visited & (1 << i)) selected.push([...virus[i], 0]);
    bfs(selected);
    return;
  }
  for (let i = start; i < l; i++)
    if (!(visited & (1 << i))) combi(cnt + 1, i, visited | (1 << i));
};

combi(0, 0, 0);

console.log(min === INF ? -1 : min);
