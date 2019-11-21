let arr = [1,2,3,4,5,6];

// function shuffle(arr) {
//     let i = arr.length;
//     while (i) {
//         let j = Math.floor(Math.random() * i--);
//         console.log(j);
//         [arr[j], arr[i]] = [arr[i], arr[j]];
//     }
//     return arr
// }

// shuffle([1,2,3,4,5])

let dec = arr => {
    return arr.filter((value, index, self) => {
        return self.indexOf(value) === index;
    })
}

function getSum() {
    return arr.reduce((pre, value, index, arr) => {
        return pre + value;
    }, 0) 
}

console.log(dec([1,2,2,3,4,5,5]))
console.log(getSum([1,2,3,4,5,6]));
console.log([1,2,3].map(() => {}))