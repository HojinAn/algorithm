import * as fs from "fs";
const input = fs.readFileSync("/dev/stdin").toString().trim().split("");
const integral = (str: string) => {
  const strArr = str.split("");
  let cnt = 0;
  for (let i = str.length - 1; i >= 0; i--) {
    if (strArr[i] !== "x") break;
    strArr.pop();
    cnt++;
  }
  const headNum = +strArr.join("") / (cnt + 1);
  let x = "";
  for (let i = 0; i <= cnt; i++) x += "x";
  return headNum
    ? headNum > 0
      ? headNum === 1
        ? "+" + x
        : "+" + (headNum + x)
      : headNum === -1
      ? "-" + x
      : headNum + x
    : "";
};

let answer = "";
let tmp = "";

input.forEach((el) => {
  if (el === "+" || el === "-") {
    answer += `${integral(tmp)}`;
    tmp = `${el}`;
  } else tmp += el;
});
answer += `${integral(tmp)}`;
answer += "+W";
console.log(answer[0] === "+" ? answer.slice(1) : answer);
