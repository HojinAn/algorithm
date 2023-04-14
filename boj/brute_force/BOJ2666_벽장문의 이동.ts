import * as fs from 'fs';
const [, S2, S3, ...inp] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n');

type Opened = [number, number];

const opened = S2.trim().split(' ').map(Number) as Opened;
const m = +S3;
const toUseNums = inp.map(Number);

let min = Number.MAX_SAFE_INTEGER;

const dfs = (depth: number, [o1, o2]: Opened, cnt = 0) => {
  if (cnt >= min) return;
  if (depth === m) {
    min = cnt;
    return;
  }
  const target = toUseNums[depth];
  dfs(depth + 1, [target, o2], cnt + Math.abs(o1 - target));
  dfs(depth + 1, [o1, target], cnt + Math.abs(o2 - target));
};

dfs(0, opened);

console.log(min);
