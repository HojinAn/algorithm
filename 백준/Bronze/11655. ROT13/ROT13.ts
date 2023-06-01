import * as fs from 'fs';
const input = fs.readFileSync('/dev/stdin').toString().split('');

const ROT13 = (ascii: number, offset: number) =>
  String.fromCharCode(((ascii - offset + 13) % 26) + offset);

console.log(
  input
    .map((c) => {
      const ascii = c.charCodeAt(0);
      if (ascii >= 65 && ascii <= 90) {
        return ROT13(ascii, 65);
      }
      if (ascii >= 97 && ascii <= 122) {
        return ROT13(ascii, 97);
      }
      return c;
    })
    .join('')
);
