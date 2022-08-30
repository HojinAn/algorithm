import * as fs from "fs";
let [str1, num] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [n, k] = str1.trim().split(" ").map(Number);

const stack: string[] = [];
const diff = n - k;
let cnt = 0;
let idx = 0;
while (idx < n) {
  const popped = num[idx++];
  stack.push(popped);
  const numHead = +num[idx];
  if (+popped < numHead) {
    while (+stack[stack.length - 1] < numHead) {
      stack.pop();
      cnt++;
      if (cnt === k) break;
    }
  }
  if (stack.length === diff) break;
  if (cnt === k) {
    stack.push(num.slice(idx));
    break;
  }
}
console.log(stack.join(""));
