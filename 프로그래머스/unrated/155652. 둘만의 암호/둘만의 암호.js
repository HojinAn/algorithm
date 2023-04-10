function solution(s, skip, index) {
    const alphabets = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const alphabetMap = new Map(alphabets.map((ch, i) => [ch, i]));
    skip.split('').forEach((ch) => alphabetMap.delete(ch));
    const newAlphabets = [...alphabetMap.keys()];
    const newAlphabetMap = new Map(newAlphabets.map((ch, i) => [ch, i]));
    const size = newAlphabets.length;
    return s.split('').map((ch) => {
        const idx = newAlphabetMap.get(ch);
        return newAlphabets[(idx + index) % size];
    }).join('');
}