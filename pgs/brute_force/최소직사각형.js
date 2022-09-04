function solution(sizes) {
  sizes.forEach((el, i) => sizes[i].sort((a, b) => a - b));
  sizes.sort((a, b) => b[1] - a[1]);
  const m1 = sizes[0][1];
  sizes.sort((a, b) => b[0] - a[0]);
  const m2 = sizes[0][0];
  return m1 * m2;
}
