import * as fs from "fs";
const [[str1], ...str] = fs
    .readFileSync("/dev/stdin")
    .toString()
    .trim()
    .split("\n")
    .map((el) => el.split(" ")),
  n = +str1;
str.sort((a, b) => {
  const [y1, y2] = [+a[3], +b[3]];
  const [m1, m2] = [+a[2], +b[2]];
  const [d1, d2] = [+a[1], +b[1]];
  return y1 === y2 ? (m1 === m2 ? d1 - d2 : m1 - m2) : y1 - y2;
});
console.log(`${str[n - 1][0]}\n${str[0][0]}`);
