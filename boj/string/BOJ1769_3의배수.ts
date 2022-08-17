import * as fs from "fs";
const X = fs.readFileSync("/dev/stdin").toString().trim();
let cnt = 0;
const noMulti3 = (str: string) => {
  if (+str < 10) return +str % 3;
  cnt++;
  const num = str
    .split("")
    .map(Number)
    .reduce((acc, cur) => acc + cur);
  return noMulti3("" + num);
};
const ans = noMulti3(X) ? "NO" : "YES";
console.log(`${cnt}\n${ans}`);
