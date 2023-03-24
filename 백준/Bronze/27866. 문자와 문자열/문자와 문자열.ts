import * as fs from 'fs';
const [S, I] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const i = +I;
console.log(S[i - 1]);
