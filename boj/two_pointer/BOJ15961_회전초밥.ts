import * as fs from "fs";
const str = fs.readFileSync("/dev/stdin").toString();
let idx = 0;
for (let i = 0; i < str.length; i++)
  if (str[i] === "\n") {
    idx = i;
    break;
  }

const [n, d, k, c] = str.slice(0, idx).trim().split(" ").map(Number);
const sushi = str.slice(idx).trim().split("\n").map(Number);

let l = 0,
  r = k - 1,
  max = 0;
const counter = new Map<number, number>();

for (let i = l; i <= r; i++) {
  const no = counter.get(sushi[i]);
  no ? counter.set(sushi[i], no + 1) : counter.set(sushi[i], 1);
}
l++, r++;

const pushC = counter.get(c);
pushC ? counter.set(c, pushC + 1) : counter.set(c, 1);

while (l < n) {
  const popNo = sushi[(l - 1) % n];
  const pop = counter.get(popNo)!;
  pop === 1 ? counter.delete(popNo) : counter.set(popNo, pop - 1);

  const pushNo = sushi[r % n];
  const push = counter.get(pushNo);
  push ? counter.set(pushNo, push + 1) : counter.set(pushNo, 1);

  max = Math.max(max, counter.size);
  l++, r++;
}
console.log(max);
