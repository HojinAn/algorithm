import * as fs from "fs";
const [, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.trim().split(" "));
const stack: number[] = [];
let answer = "";
arr.forEach(([order, num]) => {
  const len = stack.length;
  switch (order) {
    case "push":
      stack.push(+num);
      break;
    case "pop":
      answer += `${stack.pop() ?? -1}\n`;
      break;
    case "size":
      answer += `${len}\n`;
      break;
    case "empty":
      answer += `${len ? 0 : 1}\n`;
      break;
    case "top":
      answer += `${stack[len - 1] ?? -1}\n`;
      break;
  }
});
console.log(answer.trim());
