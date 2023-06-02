import * as fs from 'fs';
const [a, b, c, d] = fs.readFileSync('/dev/stdin').toString().trim().split(' ');
console.log(+`${a + b}` + +`${c + d}`);
