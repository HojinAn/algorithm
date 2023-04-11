function solution(ingredient) {
    let size = 0;
    
    ingredient.reduce((stack, no) => {
        stack.push(no);
        if (stack.length >= 4 && canHamburger(stack)) {
            for (let i = 0; i < 4; i++) stack.pop();
            size++;
        } 
        return stack;
    }, [])
    
    return size;
}

function canHamburger(stack) {
    const n = stack.length;
   	const recipe = [1, 2, 3, 1];
    for (let i = 1; i <= 4; i++) if(stack[n - i] !== recipe.pop()) return false;
    return true;
}