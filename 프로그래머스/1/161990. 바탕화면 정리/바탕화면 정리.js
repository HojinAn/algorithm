function solution(wallpaper) {
    const WALL = '#';
    const INF = 100;
    wallpaper = wallpaper.map((s) => s.split(''));
    const [rMin, rMax] = [wallpaper.findIndex((li) => li.some((s) => s === WALL)), wallpaper.length - wallpaper.reverse().findIndex((li) => li.some((s) => s === WALL))];
    const [cMin, cMax] = [Math.min(...wallpaper.map((li) => {
        const idx = li.findIndex((s) => s === WALL);
        return idx === -1 ? INF : idx;
    })), wallpaper[0].length - Math.min(...wallpaper.map((li) => {
        const idx = li.reverse().findIndex((s) => s === WALL);
        return idx === -1 ? INF : idx;
    }))];
    return [rMin, cMin, rMax, cMax];
}