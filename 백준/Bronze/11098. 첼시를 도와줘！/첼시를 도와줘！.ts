import * as fs from 'fs';
const [s, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const n = +s;

let idx = 0;

console.log(
  [...Array(n)]
    .reduce((ans) => {
      const p = +inp[idx++];
      const players = inp.slice(idx, (idx += p)).map((li) => {
        const [cost, name] = li.split(' ');
        return { cost: +cost, name };
      });
      players.sort((a, b) => b.cost - a.cost);
      ans.push(players[0].name);
      return ans;
    }, [] as string[])
    .join('\n')
);
