import * as fs from "fs";
const [str1, str2] = fs.readFileSync("/dev/stdin").toString().trim().split(" ");
const [{ length: len1 }, { length: len2 }] = [str1, str2];
let min = 100;
const updateMin = (str1: string, str2: string) => {
    let cnt = 0;
    for (let i = 0; i < len1; i++) str1[i] !== str2[i] && cnt++;
    min = Math.min(min, cnt);
  },
  diff = len2 - len1;
for (let i = 0; i <= diff; i++) updateMin(str1, str2.slice(i, i + len1));
console.log(min);
