import * as fs from 'fs';
const [, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

console.log(
  inp
    .map((li) => {
      const [a, b] = li.split(' ');
      return a.split('').sort().join('') === b.split('').sort().join('')
        ? 'Possible'
        : 'Impossible';
    })
    .join('\n')
);
