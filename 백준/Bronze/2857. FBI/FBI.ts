import * as fs from 'fs';
const inp = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
console.log(
  inp
    .reduce((list, li, i) => {
      if (li.includes('FBI')) list.push(i + 1);
      return list;
    }, [] as number[])
    .join(' ') || 'HE GOT AWAY!'
);
