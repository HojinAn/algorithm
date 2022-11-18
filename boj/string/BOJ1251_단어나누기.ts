import * as fs from "fs";
const str = fs.readFileSync("/dev/stdin").toString().trim();
const strArr = str.split("");
const n = str.length;
const ans = <string[]>[];
for (let i = 0; i < n - 2; i++)
  for (let j = i + 1; j < n - 1; j++)
    for (let k = j + 1; k < n; k++)
      ans.push(
        strArr.slice(0, j).reverse().join("") +
          strArr.slice(j, k).reverse().join("") +
          strArr.slice(k).reverse().join("")
      );
console.log(ans.sort()[0]);
