import * as fs from 'fs';
const [, expression, ...inp] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n');

const numMap = inp.reduce((map, s, i) => {
  map.set(String.fromCharCode(65 + i), +s);
  return map;
}, new Map<string, number>());

console.log(
  expression
    .split('')
    .reduce((stack, s) => {
      if (/[A-Z]/.test(s)) {
        stack.push(numMap.get(s)!);
      } else {
        const b = stack.pop()!;
        const a = stack.pop()!;
        stack.push(
          (() => {
            switch (s) {
              case '+':
                return a + b;
              case '-':
                return a - b;
              case '*':
                return a * b;
              case '/':
                return a / b;
              default:
                return 0;
            }
          })()
        );
      }
      return stack;
    }, [] as number[])[0]
    .toFixed(2)
);
