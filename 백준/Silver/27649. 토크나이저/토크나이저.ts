import * as fs from 'fs';
const inp = fs.readFileSync('/dev/stdin').toString().trim();
const cmd = inp.split(/ +/g).join(' ');
const n = cmd.length;

const AMPERSAND = '&';
const PIPE = '|';
const BLANK = ' ';
const seperators = new Set(['<', '>', AMPERSAND, PIPE, '(', ')', BLANK]);
const ans = <string[]>[];
for (let i = 0; i < n; i++) {
  const tmp = <string[]>[];
  const c = cmd[i];
  if (seperators.has(c))
    c !== BLANK && ans.push(c === AMPERSAND || c === PIPE ? (i++, c + c) : c);
  else {
    while (i < n && !seperators.has(cmd[i])) tmp.push(cmd[i++]);
    i < n && i--;
    ans.push(tmp.join(''));
  }
}

console.log(ans.join(' '));
