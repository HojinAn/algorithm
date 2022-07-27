import * as fs from "fs";
const strList = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
strList.pop();
const isBal = (str: string) => {
  const stack: string[] = [];
  for (let i = 0; i < str.length; i++) {
    const tmp = str.charAt(i);
    switch (tmp) {
      case "[":
      case "(":
        stack.push(tmp);
        break;
      case "]":
        if (stack[stack.length - 1] === "[") stack.pop();
        else return false;
        break;
      case ")":
        if (stack[stack.length - 1] === "(") stack.pop();
        else return false;
        break;
      default:
        break;
    }
  }
  if (stack.length) return false;
  return true;
};
console.log(
  strList.reduce((acc, cur) => acc + (isBal(cur) ? `yes\n` : `no\n`), "").trim()
);
