function solution(n) {
  const cnt = n
    .toString(2)
    .split("")
    .filter((el) => el === "1").length;
  while (1) {
    n++;
    if (
      n
        .toString(2)
        .split("")
        .filter((el) => el === "1").length === cnt
    )
      return n;
  }
}
