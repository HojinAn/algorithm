function solution(babbling) {
    const PRONOUNS = ['aya', 'ye', 'woo', 'ma'];
    const canSpeack = (str) => {
        const checkPronoun = (i, idx) => [...PRONOUNS[idx]].every((s, j)=>s===str[i+j]);
        let prev = -1;
        for (let i = 0, len = str.length; i < len; i++) {
            const ch1st = str[i];
            let idx;
            switch(ch1st) {
                case 'a':
                    idx = 0;
                    if (prev === idx || !checkPronoun(i, idx)) return 0;
                    i += 2;
                    break;
                case 'y':
                    idx = 1;
                    if (prev === idx || !checkPronoun(i, idx)) return 0;
                    i++;
                    break;
                case 'w':
                    idx = 2;
                    if (prev === idx || !checkPronoun(i, idx)) return 0;
                    i += 2;
                    break;
                case 'm':
                    idx = 3;
                    if (prev === idx || !checkPronoun(i, idx)) return 0;
                    i++;
                    break;
                default:
                    return 0;
            }
            prev = idx;
        }
        return 1;
    }
    return babbling.reduce((cnt, str) => cnt + canSpeack(str), 0);
}