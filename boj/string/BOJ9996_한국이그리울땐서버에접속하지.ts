import * as fs from "fs";
const [_, pattern, ...files] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const [ptrn1, ptrn2] = pattern.split("*");

const coincide = (str: string) =>
  str.length >= pattern.length - 1 &&
  str.slice(0, ptrn1.length) === ptrn1 &&
  str.slice(str.length - ptrn2.length) === ptrn2
    ? "DA"
    : "NE";

console.log(
  files.reduce((ans: string[], file) => [...ans, coincide(file)], []).join("\n")
);
