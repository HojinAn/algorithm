import * as fs from 'fs';
const [, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

console.log(
  Array.from(
    inp
      .map((li) => li.trim().split(' '))
      .reduce(
        (list, [name, cmd]) =>
          cmd === 'enter' ? list.add(name) : (list.delete(name), list),
        new Set<string>()
      )
      .values()
  )
    .sort()
    .reverse()
    .join('\n')
);
