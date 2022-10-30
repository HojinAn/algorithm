import * as fs from "fs";
const varName = fs.readFileSync("/dev/stdin").toString().trim();

const varList = varName.split("_");

try {
  if (varName[0] === varName[0].toUpperCase()) throw Error();
  if (varList.length === 1) {
    const n = varName.length;
    const answer = <string[]>[];
    let str = "";
    for (let i = 0; i < n; i++) {
      const tmp = varName[i];
      if (tmp === tmp.toUpperCase()) {
        answer.push(str);
        str = tmp.toLowerCase();
      } else str += tmp;
    }
    answer.push(str);
    console.log(answer.join("_"));
  } else {
    varList.forEach((str) => {
      const m = str.length;
      for (let i = 0; i < m; i++) {
        if (str[i] === str[i].toUpperCase()) throw Error();
      }
    });
    console.log(
      varList
        .reduce((answer, str, i) => {
          if (str[0] === str[0].toLowerCase())
            answer.push(i ? str[0].toUpperCase() + str.slice(1) : str);
          return answer;
        }, <string[]>[])
        .join("") || "Error!"
    );
  }
} catch {
  console.log("Error!");
}
