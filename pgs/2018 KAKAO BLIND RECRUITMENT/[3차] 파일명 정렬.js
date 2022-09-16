function solution(files) {
  const regex1 = /\D+/g;
  const regex2 = /\d+/;
  const names = files.map((el) => {
    const arr1 = el.split(regex1);
    const arr2 = el.split(regex2);
    const idx = arr1[1].length + arr2[0].length;
    return [arr2[0], arr1[1], el.slice(idx)];
  });
  names.sort(([strA, noA, restA], [strB, noB, restB]) => {
    const strCmpr = strA.toLowerCase().localeCompare(strB.toLowerCase());
    return strCmpr !== 0 ? strCmpr : +noA - +noB;
  });
  return names.map((el) => el.join(""));
}
