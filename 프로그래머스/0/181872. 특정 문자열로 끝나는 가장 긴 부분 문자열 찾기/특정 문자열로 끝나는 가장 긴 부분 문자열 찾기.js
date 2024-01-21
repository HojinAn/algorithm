function solution(myString, pat) {
    const tap = [...pat].reverse().join('');
    const rIdx = [...myString].reverse().join('').indexOf(tap);
    return myString.slice(0, myString.length - rIdx);
}