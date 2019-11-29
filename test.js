var isValid = function(s) {
    let stack = s.split('').reverse();

    for(let i = stack.length - 1; i >= 0; i --) {
        let index;
        let item = stack[i];
        if(stack.lastIndexOf(item) != -1) {
            index = stack.lastIndexOf(item);
            stack.pop();
            stack.splice(index, 1);
        } 
    }

    console.log(stack)
    return stack.length == 0;
};

console.log(isValid('(]'))// 10