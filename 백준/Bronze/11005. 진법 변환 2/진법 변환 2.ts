import * as fs from 'fs';
const file = fs.readFileSync('/dev/stdin');
let [n, b] = file.toString().trim().split(' ').map(Number);
const strMap = new Map(
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((s, i) => [i + 10, s])
);
const ans = <(string | number)[]>[];
while (n) {
  const target = n % b;
  ans.push(strMap.get(target) ?? target);
  n = Math.floor(n / b);
}
console.log(ans.reverse().join(''));
