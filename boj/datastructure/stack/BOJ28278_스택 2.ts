import * as fs from 'fs';
const [, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const ans: number[] = [];
inp.reduce((stack, li) => {
  const [cmd, x] = li.trim().split(' ').map(Number);
  switch (cmd) {
    case 1:
      stack.push(x);
      break;
    case 2:
      ans.push(stack.pop() ?? -1);
      break;
    case 3:
      ans.push(stack.length);
      break;
    case 4:
      ans.push(stack.length ? 0 : 1);
      break;
    case 5:
      ans.push(stack[stack.length - 1] ?? -1);
      break;
  }
  return stack;
}, <number[]>[]);

console.log(ans.join('\n'));
