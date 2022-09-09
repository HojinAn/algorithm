function solution(s, n) {
  const increaseChar = (char) => {
    let m = char.charCodeAt(0) + n;
    if ("a" <= char && char <= "z" && 122 < m) m -= 26;
    else if ("A" <= char && char <= "Z" && 90 < m) m -= 26;
    return String.fromCharCode(m);
  };
  let ans = "";
  const arr = s.split("");
  for (let i = 0, len = s.length; i < len; i++) {
    if (s[i] === " ") ans += s[i];
    else ans += increaseChar(s[i]);
  }
  return ans;
}
