import * as fs from "fs";
const n = +fs.readFileSync("/dev/stdin").toString(),
  q = [1];
let qSize = 1,
  qIdx = 0;
for (let i = 2; i <= n; i++) q[qSize++] = i;
while (qSize - qIdx > 1) qIdx++, (q[qSize++] = q[qIdx++]);
console.log(q[qIdx]);
