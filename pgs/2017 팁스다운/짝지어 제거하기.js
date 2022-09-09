function solution(s) {
  const stack = [];
  for (const el of s)
    stack[stack.length - 1] === el ? stack.pop() : stack.push(el);
  return !stack.length ? 1 : 0;
}
