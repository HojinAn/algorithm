import * as fs from "fs";
const [str1, ...str2] = fs
    .readFileSync("/dev/stdin")
    .toString()
    .trim()
    .split("\n"),
  n = +str1,
  map = str2.map((li) => li.trim().split(" ").map(Number));
for (let k = 0; k < n; k++)
  for (let i = 0; i < n; i++)
    for (let j = 0; j < n; j++)
      !map[i][j] && (map[i][j] = map[i][k] & map[k][j]);
let answer = "";
map.forEach((li) => {
  li.forEach((el) => (answer += `${el} `));
  answer += "\n";
});
console.log(answer.trim());
