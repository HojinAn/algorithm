import * as fs from "fs";
const inp = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
inp.pop();
console.log(
  inp.map((li)=>{
    const [n1, n2] = li.trim().split(' ').map(Number);
    return n1 > n2 ? 'Yes' : 'No';
  }).join('\n')
)