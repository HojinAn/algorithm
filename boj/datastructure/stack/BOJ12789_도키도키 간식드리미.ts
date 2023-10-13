import * as fs from 'fs';
const [a, b] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const n = +a;
const numbers = b.trim().split(' ').map(Number);

let pointer = 1;

const stack: number[] = numbers.reduce((stack, no) => {
  if (no === pointer) {
    pointer++;
  } else {
    while (stack[stack.length - 1] === pointer) {
      pointer++;
      stack.pop();
    }
    stack.push(no);
  }
  return stack;
}, <number[]>[]);

for (; pointer <= n; pointer++) {
  if (stack[stack.length - 1] === pointer) {
    stack.pop();
  }
}

console.log(stack.length ? 'Sad' : 'Nice');
