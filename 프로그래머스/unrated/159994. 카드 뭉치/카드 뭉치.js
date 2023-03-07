function solution(cards1, cards2, goal) {
    let l = 0;
    let r = 0;
    const checkPossible = (str) => {
        if (str === cards1[l]) {
            l++;
            return true;
        }
        if (str === cards2[r]) {
            r++;
            return true;
        }
        return false;
    }
    return goal.every(checkPossible) ? 'Yes' : 'No';
}