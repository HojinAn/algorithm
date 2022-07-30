import * as fs from "fs";
const str = fs.readFileSync("/dev/stdin").toString().trim();
console.log(
  Math.min(
    str.split("0").filter((el) => el).length,
    str.split("1").filter((el) => el).length
  )
);
