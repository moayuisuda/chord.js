let arr = [1,2,3,4,5];
let result = [];

for(var i = 0; i < arr.length; i ++) {
    result.push(() => i)
}

console.log(result);
