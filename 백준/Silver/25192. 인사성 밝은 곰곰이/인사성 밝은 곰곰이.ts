import * as fs from 'fs';
const [, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const acc = new Set<string>();
console.log(
  inp.reduce((cnt, str) => {
    str === 'ENTER' ? ((cnt += acc.size), acc.clear()) : acc.add(str.trim());
    return cnt;
  }, 0) + acc.size
);
