function solution(s) {
  let ans = "";
  for (let i = 0, n = s.length; i < n; i++) {
    switch (s[i]) {
      case " ":
        ans += " ";
        break;
      default:
        let idx = 0;
        while (s[i + idx] !== " " && i + idx < n) {
          ans += idx % 2 ? s[i + idx].toLowerCase() : s[i + idx].toUpperCase();
          idx++;
        }
        i += idx - 1;
        break;
    }
  }
  return ans;
}
