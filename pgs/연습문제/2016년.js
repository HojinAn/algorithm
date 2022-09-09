function solution(a, b) {
  const month = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const day = ["THU", "FRI", "SAT", "SUN", "MON", "TUE", "WED"];
  for (let i = 1; i < a; i++) b += month[i];
  b %= 7;
  return day[b];
}
