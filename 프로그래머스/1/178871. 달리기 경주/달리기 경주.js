function solution(players, callings) {
    const ranks = {};
    const rankKeys = {};
    players.forEach((player, idx) => {
        const rank = idx + 1;
        ranks[player] = rank;
        rankKeys[rank] = player;
    });
    return Object.entries(callings.reduce((result, calling) => {
        const idx = ranks[calling];
        const loser = result[idx - 1];
        ranks[calling] = idx - 1;
        ranks[loser] = idx;
        result[idx - 1] = calling;
        result[idx] = loser;
        return result;
    }, rankKeys)).sort(([k1, v1], [k2, v2]) => +k1 - +k2).map(([k, v]) => v);
}