import * as fs from 'fs';

const inp = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [[n], cards] = inp.map((li) => li.trim().split(' ').map(Number));

const cache = [0, ...cards];

for (let i = 1; i <= n; i++)
  for (let j = i - 1; j >= 0; j--)
    cache[i] = Math.min(cache[i - j] + cache[j], cache[i]);

console.log(cache[n]);
