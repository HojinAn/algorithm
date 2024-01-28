function solution(picture, k) {
    return picture.flatMap((li) => [...Array(k)].map(() => [...li].map((el) => el.repeat(k)).join('')));
}