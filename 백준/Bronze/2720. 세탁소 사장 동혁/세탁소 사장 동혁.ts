import * as fs from 'fs';
const file = fs.readFileSync('/dev/stdin');
const [, ...inp] = file.toString().trim().split('\n').map(Number);
console.log(
  inp
    .map((cents) =>
      [25, 10, 5, 1]
        .map((cent) => {
          const div = Math.floor(cents / cent);
          cents %= cent;
          return div;
        })
        .join(' ')
    )
    .join('\n')
);
