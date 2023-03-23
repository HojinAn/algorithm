import * as fs from 'fs';
const inp = fs.readFileSync('/dev/stdin').toString().trim().split(' ');
const [x, y] = inp.map(Number);

const months = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const dates = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

const days = months.slice(0, x).reduce((s, e) => s + e);
const date = (days + y - 1) % 7;
console.log(dates[date]);
