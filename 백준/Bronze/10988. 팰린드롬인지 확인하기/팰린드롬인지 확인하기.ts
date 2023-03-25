import * as fs from 'fs';
const str = fs.readFileSync('/dev/stdin').toString();

const isPal = (s: string, { length } = s) =>
  [...Array(Math.floor(length / 2))].every(
    (_, i) => s[i] === s[length - 2 - i]
  );

console.log(isPal(str) ? 1 : 0);
