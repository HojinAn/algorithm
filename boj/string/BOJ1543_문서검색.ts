import * as fs from "fs";
const [str1, str2] = fs
    .readFileSync("/dev/stdin")
    .toString()
    .trim()
    .split("\n"),
  [{ length: len1 }, { length: len2 }] = [str1, str2],
  diff = len1 - len2;
let i = 0,
  cnt = 0;
while (i <= diff) {
  str1[i] === str2[0] &&
    str1.slice(i, i + len2) === str2 &&
    (cnt++, (i += len2 - 1));
  i++;
}
console.log(cnt);
