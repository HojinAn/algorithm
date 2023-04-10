function solution(s, skip, index) {
    const alphabets = 'abcdefghijklmnopqrstuvwxyz'.split('').filter((ch) => !skip.includes(ch));
    const size = alphabets.length;
    return s.split('').map((ch) => alphabets[(alphabets.indexOf(ch) + index) % size]).join('');
}