function solution(picks, minerals) {
    let ans = Number.MAX_SAFE_INTEGER;
    const DIA = 'diamond';
    const IRON = 'iron';
    const mine = ([diaP, ironP, stoneP], toMinings, fatigue) => {
        if (ans <= fatigue) {
            return;
        }
        if ((diaP === 0 && ironP === 0 && stoneP === 0) || toMinings.length === 0) {
            ans = fatigue;
            return;
        }
        const current = toMinings.slice(0, 5);
        const next = toMinings.slice(5);
        if (diaP > 0) {
            mine([diaP - 1, ironP, stoneP], next, fatigue + current.reduce((acc, mineral) => acc + 1, 0))
        }
        if (ironP > 0) {
            mine([diaP, ironP - 1, stoneP], next, fatigue + current.reduce((acc, mineral) => acc + (mineral === DIA ? 5 : 1), 0))
        }
        if (stoneP > 0) {
            mine([diaP, ironP, stoneP - 1], next, fatigue + current.reduce((acc, mineral) => {
                if (mineral === DIA) {
                    return acc + 25;
                }
                if (mineral === IRON) {
                    return acc + 5;
                }
                return acc + 1;
            }, 0))
        }
    }
    mine(picks, minerals, 0)
    return ans;
}