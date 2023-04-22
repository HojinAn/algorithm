import * as fs from 'fs';
const file = fs.readFileSync('/dev/stdin');
const [s, b] = file.toString().trim().split(' ');
const strMap = new Map(
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((s, i) => [s, i + 10])
);
const strArr = s.trim().split('');
const n = strArr.length;
const B = +b;
let ans = 0;
for (let i = 0; i < n; i++) {
  const target = strArr.pop()!;
  ans += (strMap.get(target) ?? +target) * B ** i;
}
console.log(ans);
