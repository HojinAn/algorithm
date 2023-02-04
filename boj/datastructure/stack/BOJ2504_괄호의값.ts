import * as fs from 'fs';
const parentheses = fs.readFileSync('/dev/stdin').toString().trim().split('');
const n = parentheses.length;
const LEFT_2 = '(';
const LEFT_3 = '[';
const RIGHT_2 = ')';
const stack = <string[]>[];
const ans = calcParentheses();

console.log(stack.length ? 0 : ans);

function calcParentheses(idx = 0, mul = 1, result = 0) {
  if (idx === n) return result;
  const s = parentheses[idx];
  switch (s) {
    case LEFT_2:
    case LEFT_3:
      stack.push(s);
      return calcParentheses(idx + 1, mul * (s === LEFT_2 ? 2 : 3), result);
    default:
      const left = s === RIGHT_2 ? LEFT_2 : LEFT_3;
      if (!stack.length || stack[stack.length - 1] !== left) return 0;
      if (parentheses[idx - 1] === left) result += mul;
      stack.pop();
      return calcParentheses(idx + 1, mul / (s === RIGHT_2 ? 2 : 3), result);
  }
}
