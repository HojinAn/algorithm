function solution(s) {
  let blank = true;
  return s.split("").reduce((acc, cur) => {
    cur === " "
      ? (blank = true)
      : blank
      ? ((cur = cur.toUpperCase()), (blank = false))
      : (cur = cur.toLowerCase());
    return acc + cur;
  }, "");
}
