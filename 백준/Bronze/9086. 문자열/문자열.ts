import * as fs from 'fs';
const [, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

console.log(
    inp.reduce<string[]>((ans, li) => {
    ans.push(`${li[0]}${li[li.length - 1]}`);
    return ans;
}, []).join('\n')
);