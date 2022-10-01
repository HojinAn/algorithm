import * as fs from "fs";
const [str1, ...inp] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
let T = +str1;
let cnt = 0;
const ans: string[] = [];

const isPal = (str: string, l: number, r: number) => {
  cnt++;
  if (l + 1 < r) return str[l] === str[r] ? isPal(str, l + 1, r - 1) : 0;
  else if (l + 1 === r) return str[l] === str[r] ? (cnt++, 1) : 0;
  else return 1;
};

for (let i = 0; i < T; i++)
  (cnt = 0), ans.push(`${isPal(inp[i], 0, inp[i].length - 1)} ${cnt}`);

console.log(ans.join("\n"));
