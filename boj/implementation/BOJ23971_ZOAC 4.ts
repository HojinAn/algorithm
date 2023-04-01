import * as fs from 'fs';
const S = fs.readFileSync('/dev/stdin').toString();
const [h, w, n, m] = S.trim().split(' ').map(Number);
let cnt = 0;
for (let i = 0; i < h; i += n + 1) for (let j = 0; j < w; j += m + 1) cnt++;
console.log(cnt);
