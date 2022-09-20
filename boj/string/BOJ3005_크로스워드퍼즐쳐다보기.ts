import * as fs from "fs";
const [str1, ...inp] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const [n, m] = str1.trim().split(" ").map(Number);
const ans: string[] = [];

const inpCandi = (a: number, b: number, row: boolean) => {
  let el = "";
  for (let i = 0; i < a; i++) {
    for (let j = 0; j < b; j++) {
      const tmp = row ? inp[i][j] : inp[j][i];
      switch (tmp) {
        case "#":
          el.length > 1 && ans.push(el);
          el = "";
          break;
        default:
          el += tmp;
          break;
      }
    }
    el.length > 1 && ans.push(el);
    el = "";
  }
};
inpCandi(n, m, true);
inpCandi(m, n, false);
console.log(ans.sort()[0]);
