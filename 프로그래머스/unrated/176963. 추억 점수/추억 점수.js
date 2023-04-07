function solution(name, yearning, photo) {
    const yearningMap = name.reduce((map, k, i) => {
        map.set(k, yearning[i]);
        return map;
    }, new Map());
    
    return photo.map((names) => names.reduce((score, name) => score + (yearningMap.get(name) ?? 0), 0))
}