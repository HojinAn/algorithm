import * as fs from 'fs';
const s = fs.readFileSync('/dev/stdin').toString();
const n = +s;

console.log(
  [...Array(2 * n - 1)]
    .map((_, i) =>
      Array(n - Math.abs(n - i - 1))
        .fill('*')
        .join('')
    )
    .join('\n')
);
