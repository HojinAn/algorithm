import * as fs from 'fs';
console.log(4 * +fs.readFileSync('/dev/stdin').toString());