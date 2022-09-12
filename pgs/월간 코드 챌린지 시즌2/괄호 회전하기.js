function solution(s) {
  const n = s.length;
  let cnt = 0;
  const pair = {
    ")": "(",
    "]": "[",
    "}": "{",
  };
  const isPossible = (str) => {
    const stack = [];
    for (let i = 0; i < n; i++) {
      const chr = str[i];
      switch (chr) {
        case ")":
        case "]":
        case "}":
          if (stack[stack.length - 1] === pair[chr]) stack.pop();
          else return false;
          break;
        default:
          stack.push(chr);
          break;
      }
    }
    return !stack.length;
  };
  for (let i = 0; i < n; i++) isPossible(s.slice(i) + s.slice(0, i)) && cnt++;
  return cnt;
}
