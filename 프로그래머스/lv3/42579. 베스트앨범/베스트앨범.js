function solution(genres, plays) {
    const n = genres.length;
    
    const bestAlbum = [];
    
    const genreCounter = new Map();
    const genreIdCountMap = new Map();
    
    genres.forEach((genre, id) => {
        const cnt = plays[id];
        genreCounter.set(genre, (genreCounter.get(genre) ?? 0) + cnt);
        genreIdCountMap.set(genre, (genreIdCountMap.get(genre) ?? []).concat([[cnt, id]]));
    })
    
	const genreOrder = [...genreCounter.entries()].sort((a, b) => b[1] - a[1]);
    genreOrder.forEach(([genre]) => {
        const idCntArr = genreIdCountMap.get(genre).sort((a, b) => a[0] === b[0] ? a[1] - b[1] : b[0] - a[0]);
        let size = Math.min(2, idCntArr.length);
        for (let i = 0; i < size; i++) bestAlbum.push(idCntArr[i][1]);
    })
    
    return bestAlbum;
}