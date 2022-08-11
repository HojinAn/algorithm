import * as fs from "fs";
const inputList = fs.readFileSync("/dev/stdin").toString().trim().split("\n"),
  trees = {},
  { length: n } = inputList;
inputList.forEach((el) => (trees[el] ? trees[el]++ : (trees[el] = 1)));
console.log(
  Object.entries(trees)
    .sort((a, b) => (a[0] < b[0] ? -1 : 1))
    .reduce(
      (acc, cur) =>
        acc + `${cur[0]} ${((100 * Number(cur[1])) / n).toFixed(4)}\n`,
      ""
    )
    .trim()
);
