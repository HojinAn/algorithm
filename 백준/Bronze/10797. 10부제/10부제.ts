import * as fs from 'fs';
const [a, b] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const target = +a;
console.log(
  b
    .trim()
    .split('')
    .reduce((counter, s) => ({ ...counter, [s]: (counter[s] || 0) + 1 }), {})[
    target
  ] ?? 0
);
