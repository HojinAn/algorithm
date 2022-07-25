import * as fs from "fs";
const inp = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let answer = "";
const isPal = (str: string) => {
  let l = 0,
    r = str.length - 1;
  while (l < r) if (str[l++] !== str[r--]) return "no";
  return "yes";
};
inp.slice(0, inp.length - 1).forEach((el) => (answer += `${isPal(el)}\n`));
console.log(answer.trim());
