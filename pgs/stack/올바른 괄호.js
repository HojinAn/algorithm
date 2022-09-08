function solution(s) {
  const stack = [];
  const n = s.length;
  for (let i = 0; i < n; i++) {
    switch (s[i]) {
      case "(":
        stack.push("(");
        break;
      case ")":
        stack[stack.length - 1] === "(" ? stack.pop() : stack.push(")");
        break;
    }
  }
  return !stack.length;
}
