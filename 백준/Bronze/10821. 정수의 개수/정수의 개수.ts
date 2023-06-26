import * as fs from 'fs';
console.log(fs.readFileSync('/dev/stdin').toString().trim().split(',').length);