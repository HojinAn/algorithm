import * as fs from "fs";
const [li1, ...list] = fs
    .readFileSync("/dev/stdin")
    .toString()
    .trim()
    .split("\n"),
  words = list.map((el) => el.split("").reverse()),
  obj: { [key: string]: number } = {};
words.forEach((li) =>
  li.forEach((el, i) => {
    if (!obj[el]) obj[el] = 0;
    obj[el] += 10 ** i;
  })
);
const pairs = Object.entries(obj).sort((a, b) => b[1] - a[1]),
  { length } = pairs;
let answer = 0,
  idx = 0;
for (let i = 9; i > 9 - length; i--) answer += i * pairs[idx++][1];
console.log(answer);
