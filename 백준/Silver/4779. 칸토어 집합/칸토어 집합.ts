import * as fs from 'fs';
const inp = fs.readFileSync('/dev/stdin');
const LINE = '-';
const BLANK = ' ';

const solve =
  (n: number) =>
  (line = LINE) =>
    !n ? line : [line, BLANK, line].map(solve(n - 1)).join('');

console.log(
  inp
    .toString()
    .trim()
    .split('\n')
    .map(Number)
    .map(solve)
    .map((f) => f())
    .join('\n')
);
