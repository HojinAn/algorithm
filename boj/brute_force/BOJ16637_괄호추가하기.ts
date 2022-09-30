import * as fs from "fs";
const [str1, expression] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const n = +str1;
const plus = "+",
  minus = "-",
  multiply = "*";

const half = Math.floor(n / 2);
const numbers = expression.match(/\d/g)!.map(Number);
const operators = expression.match(/\D/g)!;

if (n === 1) {
  console.log(numbers[0]);
} else {
  let max = -100000000;
  const calcBracket = (a: number, b: number, operator: string) => {
    switch (operator) {
      case plus:
        return a + b;
      case multiply:
        return a * b;
      case minus:
        return a - b;
    }
    return a;
  };
  const calc = (depth: number, val: number, operator: string) => {
    if (depth > half) return;
    if (depth === half) {
      max = Math.max(max, val);
      return;
    }
    calc(
      depth + 2,
      calcBracket(
        val,
        calcBracket(
          numbers[depth + 1],
          numbers[depth + 2],
          operators[depth + 1]
        ),
        operator
      ),
      operators[depth + 2]
    );
    calc(
      depth + 1,
      calcBracket(val, numbers[depth + 1], operator),
      operators[depth + 1]
    );
  };

  calc(0, numbers[0], operators[0]);
  calc(1, calcBracket(numbers[0], numbers[1], operators[0]), operators[1]);

  console.log(max);
}
