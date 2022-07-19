import * as fs from "fs";
const [input1, ...input2] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const [n, m] = input1.trim().split(" ").map(Number);
const map = input2.map((li) => li.trim().split(""));

const red = [-1, -1],
  blue = [-1, -1];
map.forEach((li, r) =>
  li.forEach((el, c) => {
    switch (el) {
      case "R":
        [red[0], red[1]] = [r, c];
        map[r][c] = ".";
        break;
      case "B":
        [blue[0], blue[1]] = [r, c];
        map[r][c] = ".";
        break;
    }
  })
);

const q = [[...red, ...blue, 0]];
const visited: boolean[][][][] = [...Array(n)].map(() =>
  [...Array(m)].map(() => [...Array(n)].map(() => Array(m).fill(false)))
);
let qSize = 1,
  qIdx = 0;
const delta = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

const move = (d: number, [rR, rC, bR, bC]: number[]) => {
  let redFirst = false;
  if (d === 0 && rR < bR) redFirst = true;
  else if (d === 1 && rR > bR) redFirst = true;
  else if (d === 2 && rC < bC) redFirst = true;
  else if (d === 3 && rC > bC) redFirst = true;
  let [nR, nC] = [rR, rC];
  while (1) {
    nR += delta[d][0];
    nC += delta[d][1];
    if (map[nR][nC] === "#") break;
    [rR, rC] = [nR, nC];
    if (map[nR][nC] === "O") break;
  }
  [nR, nC] = [bR, bC];
  while (1) {
    nR += delta[d][0];
    nC += delta[d][1];
    if (map[nR][nC] === "#") break;
    [bR, bC] = [nR, nC];
    if (map[nR][nC] === "O") break;
  }
  if (map[bR][bC] === "O") return [rR, rC, bR, bC];
  if (rR == bR && rC == bC)
    switch (d) {
      case 0:
        if (redFirst) bR++;
        else rR++;
        break;
      case 1:
        if (redFirst) bR--;
        else rR--;
        break;
      case 2:
        if (redFirst) bC++;
        else rC++;
        break;
      case 3:
        if (redFirst) bC--;
        else rC--;
        break;
    }
  return [rR, rC, bR, bC];
};
const bfs = () => {
  while (qIdx < qSize) {
    const [redR, redC, blueR, blueC, cnt] = q[qIdx++];
    if (cnt === 10) break;
    for (let i = 0; i < 4; i++) {
      const [redNR, redNC, blueNR, blueNC] = move(i, [
        redR,
        redC,
        blueR,
        blueC,
      ]);
      if (map[blueNR][blueNC] === "O") continue;
      if (map[redNR][redNC] === "O") return 1;
      if (!visited[redNR][redNC][blueNR][blueNC]) {
        visited[redNR][redNC][blueNR][blueNC] = true;
        q[qSize++] = [redNR, redNC, blueNR, blueNC, cnt + 1];
      }
    }
  }
  return 0;
};

console.log(bfs());
