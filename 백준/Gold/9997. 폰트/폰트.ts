import * as fs from 'fs';
const [S, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const n = +S;
const ALPHA = (1 << 26) - 1;
const alphabets = inp.map((s) =>
  s
    .trim()
    .split('')
    .reduce((bi, c) => {
      bi |= 1 << (c.charCodeAt(0) - 'a'.charCodeAt(0));
      return bi;
    }, 0)
);

let cnt = 0;
const dfs = (idx: number, used: number) => {
  if (used === ALPHA) {
    cnt += 1 << (n - idx);
    return;
  }
  if (idx === n) return;
  dfs(idx + 1, used | alphabets[idx]);
  dfs(idx + 1, used);
};

dfs(0, 0);
console.log(cnt);
