import * as fs from 'fs';

const toNums = (s: string) => s.trim().split(' ').map(Number);

const [S, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [n] = toNums(S);
const ans = inp.reduce(
  (ans, s) => {
    let [f, t] = toNums(s);
    f--, t--;
    [ans[f], ans[t]] = [ans[t], ans[f]];
    return ans;
  },
  [...Array(n)].map((_, i) => i + 1)
);

console.log(ans.join(' '));
