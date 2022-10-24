import * as fs from "fs";
const ironBar = fs.readFileSync("/dev/stdin").toString().trim();

let cnt = 0;
const stack = <string[]>[];
for (let i = 0; i < ironBar.length; i++) {
  const cur = ironBar[i];
  switch (cur) {
    case "(":
      stack.push(cur);
      break;
    case ")":
      stack.pop();
      cnt += ironBar[i - 1] === "(" ? stack.length : 1;
      break;
  }
}

console.log(cnt);
