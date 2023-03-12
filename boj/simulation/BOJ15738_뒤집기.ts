import * as fs from 'fs';
const [S1, , ...inp] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n');

let [n, k] = toNums(S1);

const reverseFromTo = (no: number) => {
  if ((no > 0 && no < k) || (no < 0 && n + no + 1 > k)) return;
  k = no > 0 ? no - k + 1 : 2 * n - k + no + 1;
};

inp.forEach((s) => reverseFromTo(Number(s)));

console.log(k);

function toNums(s: string) {
  return s.trim().split(' ').map(Number);
}
