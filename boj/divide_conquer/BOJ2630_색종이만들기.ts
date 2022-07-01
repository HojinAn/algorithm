import * as fs from "fs";
const inputList = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [str1, ...str2] = inputList,
  n = +str1,
  map = str2.map((line) => line.trim().split(" ").map(Number));
let isZero,
  isOne,
  white = 0,
  blue = 0,
  i,
  j;
const cntSqr = (n: number, r: number, c: number) => {
  isZero = true;
  isOne = true;
  for (i = r; i < r + n; i++) {
    for (j = c; j < c + n; j++) {
      if (map[i][j]) isZero = false;
      if (!map[i][j]) isOne = false;
    }
  }
  if (isZero) {
    white++;
    return;
  }
  if (isOne) {
    blue++;
    return;
  }
  n >>= 1;
  cntSqr(n, r, c);
  cntSqr(n, r + n, c);
  cntSqr(n, r, c + n);
  cntSqr(n, r + n, c + n);
};
cntSqr(n, 0, 0);
console.log(`${white}\n${blue}`);
