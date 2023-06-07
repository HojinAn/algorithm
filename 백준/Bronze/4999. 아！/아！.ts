import * as fs from 'fs';
const [me, doctor] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n');
console.log(me.length >= doctor.length ? 'go' : 'no');
