function solution(n) {
    const ans = [...Array(n)].map((_, i)=>Array(i+1).fill(0)); 
    let cnt = 1;
    let row=-1, col=0;
	for(let i = n; i > 0; i-=3){
        for(let j = 0; j < i ; j++) {ans[++row][col] = cnt++;}
        for(let j = 0; j < i-1 ; j++) {ans[row][++col] = cnt++;}
        for(let j = 0; j < i-2 ; j++) {ans[--row][--col] = cnt++;}
    }
	return ans.flatMap((el)=>el);
}