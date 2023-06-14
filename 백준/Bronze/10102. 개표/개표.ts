import * as fs from 'fs';
const [, str] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const cnt = str
  .trim()
  .split('')
  .reduce((cnt, s) => cnt + (s === 'A' ? 1 : -1), 0);
console.log(cnt === 0 ? 'Tie' : cnt > 0 ? 'A' : 'B');
