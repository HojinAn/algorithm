function solution(n, works) {
  const len = works.length;
  works.sort((a, b) => a - b);
  const upperBound = (no) => {
    let l = 0,
      r = len;
    while (l < r) {
      const mid = Math.floor((l + r) / 2);
      no < works[mid] ? (r = mid) : (l = mid + 1);
    }
    return r;
  };
  const lowerBound = (no) => {
    let l = 0,
      r = len;
    while (l < r) {
      const mid = Math.floor((l + r) / 2);
      no <= works[mid] ? (r = mid) : (l = mid + 1);
    }
    return r;
  };
  while (n > 0) {
    const max = Math.max(...works);
    let m = upperBound(max) - lowerBound(max);
    let diff = 0;
    if (n < m) {
      diff = m - n;
      m = n;
    }
    works = [
      ...works.slice(0, works.indexOf(max) + diff),
      ...Array(m).fill(max - 1),
    ];
    n -= m;
  }
  return works.reduce((acc, cur) => acc + (cur > 0 ? cur ** 2 : 0), 0);
}
