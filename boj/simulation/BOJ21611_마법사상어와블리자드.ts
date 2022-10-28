import * as fs from "fs";
const [s1, ...input] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

class Node {
  no: number;
  next?: [number, number];
  prev?: [number, number];
  constructor(no: number) {
    this.no = no;
  }
}

const [n, m] = s1.trim().split(" ").map(Number);

const beadsGrid = input.slice(0, n).map((li) =>
  li
    .trim()
    .split(" ")
    .map((el) => new Node(+el))
);

const delta = [[], [-1, 0], [1, 0], [0, -1], [0, 1]];
const [sharkR, sharkC] = [(n - 1) / 2, (n - 1) / 2];

(() => {
  const order = [3, 2, 4, 1];
  const nextDirArr = <number[]>[];
  let idx = 0;
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < 2; j++) {
      for (let k = 0; k < i; k++) nextDirArr.push(order[idx % 4]);
      idx++;
    }
  }
  for (let i = 0; i < n; i++) nextDirArr.push(3);

  const prevDirArr = <number[]>[];
  const reverseOrder = [2, 3, 1, 4];
  idx = 0;
  for (let i = 1; i < n; i++) prevDirArr.push(4);
  for (let i = n - 1; i > 0; i--) {
    for (let j = 0; j < 2; j++) {
      for (let k = 0; k < i; k++) prevDirArr.push(reverseOrder[idx % 4]);
      idx++;
    }
  }

  let tmp = [sharkR, sharkC];
  nextDirArr.forEach((no) => {
    const [dr, dc] = delta[no];
    const [prevR, prevC] = tmp;
    beadsGrid[prevR][prevC].next = [dr, dc];
    tmp = [prevR + dr, prevC + dc];
  });
  tmp = [0, 0];
  prevDirArr.forEach((no) => {
    const [dr, dc] = delta[no];
    const [prevR, prevC] = tmp;
    beadsGrid[prevR][prevC].prev = [dr, dc];
    tmp = [prevR + dr, prevC + dc];
  });
})();

const moveBeads = (cntZero: number, r = sharkR, c = sharkC - 1) => {
  while (cntZero) {
    const [dr, dc] = beadsGrid[r][c].next!;
    if (!beadsGrid[r][c].no) {
      let [cr, cc] = [r, c];
      while (cr || cc) {
        const [cdr, cdc] = beadsGrid[cr][cc].next!;
        beadsGrid[cr][cc].no = beadsGrid[cr + cdr][cc + cdc].no;
        [cr, cc] = [cr + cdr, cc + cdc];
      }
      beadsGrid[0][0].no = 0;
      cntZero--;
    }
    beadsGrid[r][c].no && ([r, c] = [r + dr, c + dc]);
  }
};

const countBeads = (r = sharkR, c = sharkC - 1) => {
  const cntArr = [0, 0, 0];
  let cur = beadsGrid[r][c].no;
  let cntSame = 1;
  while (r || c) {
    const [dr, dc] = beadsGrid[r][c].next!;
    if (beadsGrid[r + dr][c + dc].no === cur) cntSame++;
    else {
      if (cntSame >= 4) {
        let [cr, cc] = [r, c];
        for (let i = 0; i < cntSame; i++) {
          beadsGrid[cr][cc].no = 0;
          const [rdr, rdc] = beadsGrid[cr][cc].prev!;
          [cr, cc] = [cr + rdr, cc + rdc];
        }
        cntArr[cur - 1] += cntSame;
      }
      cntSame = 1;
    }
    cur = beadsGrid[r + dr][c + dc].no;
    [r, c] = [r + dr, c + dc];
  }
  return cntArr;
};

const changeBeads = (r = sharkR, c = sharkC - 1) => {
  const changedArr = <number[]>[];
  let cur = beadsGrid[r][c].no;
  let cntSame = 1;
  while (r || c) {
    const [dr, dc] = beadsGrid[r][c].next!;
    if (beadsGrid[r + dr][c + dc].no === cur) cntSame++;
    else {
      changedArr.push(cntSame, cur);
      cntSame = 1;
    }
    cur = beadsGrid[r + dr][c + dc].no;
    [r, c] = [r + dr, c + dc];
  }
  (r = sharkR), (c = sharkC - 1);
  while (r || c) {
    const [dr, dc] = beadsGrid[r][c].next!;
    if (!changedArr.length) break;
    beadsGrid[r][c].no = changedArr.shift()!;
    [r, c] = [r + dr, c + dc];
  }
};

const blizzard = (d: number, dist: number) => {
  const retArr = [0, 0, 0];
  let cntDestroy = 0;
  for (let i = 1; i <= dist; i++) {
    beadsGrid[sharkR + delta[d][0] * i][sharkC + delta[d][1] * i].no &&
      cntDestroy++;
    beadsGrid[sharkR + delta[d][0] * i][sharkC + delta[d][1] * i].no = 0;
  }
  moveBeads(cntDestroy);
  while (1) {
    const cntArr = countBeads();
    const done = cntArr.reduce((acc, cur) => acc + cur);
    if (!done) break;
    cntArr.forEach((el, i) => (retArr[i] += el));
    moveBeads(done);
  }

  changeBeads();

  return retArr;
};

console.log(
  input
    .slice(n)
    .map((li) => li.trim().split(" ").map(Number))
    .reduce(
      (cnt, [d, s]) =>
        cnt + blizzard(d, s).reduce((acc, cur, i) => acc + cur * (i + 1), 0),
      0
    )
);
