function solution(topping) {
    const chulsoo = new Map();
    const brother = topping.reduce((counter, no)=>{
        counter.set(no, (counter.get(no)??0) + 1)
        return counter;
    }, new Map())
    return topping.reduce((cnt, no) => {
        chulsoo.set(no, (chulsoo.get(no) ?? 0) + 1);
        const broVal = brother.get(no);
        if (broVal === 1) brother.delete(no);
        else brother.set(no, broVal - 1);
        
        if (chulsoo.size === brother.size) cnt++;
        return cnt;
    }, 0)
}