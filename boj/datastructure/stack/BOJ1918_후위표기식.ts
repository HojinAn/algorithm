import * as fs from 'fs';
const fomula = fs.readFileSync('/dev/stdin').toString().trim();

const PLUS = '+';
const MINUS = '-';
const MULTIPLE = '*';
const DIVIDE = '/';
const BRACKET_OPEN = '(';
const BRACKET_CLOSE = ')';
const LEN = fomula.length;

const is1stOperator = (s: string) => s === MULTIPLE || s === DIVIDE;
const is2ndOperator = (s: string) => s === PLUS || s === MINUS;
const isBracket = (s: string) => s === BRACKET_CLOSE || s === BRACKET_OPEN;

const isOperator = (s: string) => is1stOperator(s) || is2ndOperator(s);
const calcPriority = (s: string) => {
  if (isBracket(s)) return 0;
  if (is2ndOperator(s)) return 1;
  if (is1stOperator(s)) return 2;
  return -1;
};

console.log(
  fomula
    .split('')
    .reduce<{ stack: string[]; ans: string[] }>(
      ({ stack, ans }, s, i) => {
        if (isOperator(s)) {
          while (
            stack.length &&
            calcPriority(stack[stack.length - 1]) >= calcPriority(s)
          )
            ans.push(stack.pop()!);
          stack.push(s);
        } else {
          switch (s) {
            case BRACKET_OPEN:
              stack.push(s);
              break;
            case BRACKET_CLOSE:
              while (stack.length && stack[stack.length - 1] !== BRACKET_OPEN)
                ans.push(stack.pop()!);
              stack.pop();
              break;
            default:
              ans.push(s);
              break;
          }
        }
        if (i === LEN - 1) while (stack.length) ans.push(stack.pop()!);
        return { stack, ans };
      },
      { stack: [], ans: [] }
    )
    .ans.join('')
);
