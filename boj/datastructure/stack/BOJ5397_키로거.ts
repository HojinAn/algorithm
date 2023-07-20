import * as fs from 'fs';
const [, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const DELETE = '-';
const MOVE_LEFT = '<';
const MOVE_RIGHT = '>';

const decipher = (hex: string): string => {
  const left: string[] = [];
  const right: string[] = [];
  hex.split('').forEach((s) => {
    switch (s) {
      case DELETE:
        if (left.length) left.pop();
        break;
      case MOVE_LEFT:
        if (left.length) right.push(left.pop()!);
        break;
      case MOVE_RIGHT:
        if (right.length) left.push(right.pop()!);
        break;
      default:
        left.push(s);
    }
  });
  return left.join('') + right.reverse().join('');
};

console.log(inp.map(decipher).join('\n'));
