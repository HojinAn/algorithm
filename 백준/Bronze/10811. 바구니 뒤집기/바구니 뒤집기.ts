import * as fs from 'fs';
const [S, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const toNums = (s:string) => s.trim().split(' ').map(Number);

const [n] = toNums(S);
const baskets = [...Array(n)].map((_, i) => i + 1);
inp.forEach((str) => {
    const [s, e] = toNums(str).map(a => a - 1);
    const half = Math.floor((e - s) / 2);
    for (let i = 0; i <= half; i++) {
        [baskets[s + i], baskets[e - i]] = [baskets[e - i], baskets[s + i]];
    }
})

console.log(baskets.join(' '))