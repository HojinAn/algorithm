import * as fs from "fs";
const [str1, str2] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const n = +str1;
const symbols = str2.trim().split(" ");

const ans: string[] = [];

const BT = (depth: number, visited: number, num: string, cur: number) => {
  if (depth === n) {
    ans.push(num);
    return;
  }
  switch (symbols[depth]) {
    case "<":
      for (let i = cur + 1; i < 10; i++)
        if (!(visited & (1 << i)))
          BT(depth + 1, visited | (1 << i), num + i, i);
      break;
    case ">":
      for (let i = cur - 1; i >= 0; i--)
        if (!(visited & (1 << i)))
          BT(depth + 1, visited | (1 << i), num + i, i);
      break;
  }
};
for (let i = 0; i < 10; i++) BT(0, 1 << i, `${i}`, i);

ans.sort((a, b) => +a - +b);
console.log(ans[ans.length - 1]);
console.log(ans[0]);
