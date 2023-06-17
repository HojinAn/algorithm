import * as fs from 'fs';
const str = fs.readFileSync('/dev/stdin').toString().trim();
console.log(str.replace(/[CAMBRIDGE]/g, ''));
