// 내 풀이
function solution(s) {
  const newS = s.replaceAll(/[a-zA-Z]/g, "");
  return s.length === newS.length && (s.length === 4 || s.length === 6);
}

// 정규표현식 굿 풀이
const solution = (s) => {
  const regex = /^\d{6}$|^\d{4}$/;
  return regex.test(s);
};
