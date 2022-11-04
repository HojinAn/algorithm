import * as fs from "fs";
const [, input] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

class Stack {
  private data: number[];
  constructor() {
    this.data = [];
  }
  size = () => this.data.length;
  peek = () => this.data[this.size() - 1];
  pop = () => this.data.pop();
  push = (no: number) => this.data.push(no);
  isEmpty = () => !this.size();
}

const numbers = input.trim().split(" ").map(Number);
const counter = numbers.reduce((fMap, key) => {
  fMap[key] = (fMap[key] ?? 0) + 1;
  return fMap;
}, {});

const answer = <number[]>[];

const stack = numbers.reduce((stack, no, i, arr) => {
  while (!stack.isEmpty() && counter[no] > counter[arr[stack.peek()]])
    answer[stack.pop()!] = no;
  stack.push(i);
  return stack;
}, new Stack());
while (!stack.isEmpty()) answer[stack.pop()!] = -1;

console.log(answer.join(" "));
