import * as fs from 'fs';
const n = fs.readFileSync('/dev/stdin').toString().trim().split('');

const answer = <string[]>[];
const bin = {
  '0': '000',
  '1': '001',
  '2': '010',
  '3': '011',
  '4': '100',
  '5': '101',
  '6': '110',
  '7': '111',
};
const first = {
  '0': '0',
  '1': '1',
  '2': '10',
  '3': '11',
  '4': '100',
  '5': '101',
  '6': '110',
  '7': '111',
};

while (n.length > 1) {
  answer.push(bin[n.pop()!]);
}
answer.push(first[n.pop()!]);
console.log(answer.reverse().join(''));
