import * as fs from "fs";
const n = +fs.readFileSync("/dev/stdin").toString();

const isGood = (str: string) => {
  const len = str.length;
  const mid = Math.ceil(len / 2);
  let idx = 1;
  for (let i = len - 1; i >= mid; i--) {
    if (str.slice(i) === str.slice(i - idx, i)) return false;
    idx++;
  }
  return true;
};

let flag = false;

const BT = (depth: number, num: string) => {
  if (depth === n) {
    console.log(num);
    flag = true;
    return;
  }
  for (let i = 1; i <= 3; i++) {
    if (num[depth - 1] === `${i}`) continue;
    const next = num + i;
    if (!flag && isGood(next)) BT(depth + 1, next);
  }
};
BT(1, "1");
