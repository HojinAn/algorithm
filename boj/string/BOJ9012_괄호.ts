import * as fs from "fs";
const [str1, ...brackets] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
let answer = "";
brackets.forEach((li) => {
  const len = li.length,
    arr: string[] = [];
  let yes = true;
  for (let i = 0; i < len; i++) {
    const el = li[i];
    switch (el) {
      case "(":
        arr.push(el);
        break;
      case ")":
        !arr.pop() && (yes = false);
        break;
      default:
        break;
    }
  }
  arr.length && (yes = false);
  answer += `${yes ? "YES" : "NO"}\n`;
});
console.log(answer.trim());
