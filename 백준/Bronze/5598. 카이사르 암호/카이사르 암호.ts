import * as fs from 'fs';
const str = fs.readFileSync('/dev/stdin').toString().trim();
console.log(
  str
    .split('')
    .map((s) => {
      let no = s.charCodeAt(0) - 3;
      if (no < 65) no += 26;
      return String.fromCharCode(no);
    })
    .join('')
);
