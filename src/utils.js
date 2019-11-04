import {
    typeMap,
    noteMap,
    intervalMap,
    degreeToIntervalMap
} from './source'

function caculateChord(options, range, signType) {
    let signIndex = (signType == '#' || !signType) ? 0 : 1;

    let intervalArr = typeMap[options.type];
    options.add.map(degree => {
        intervalArr.push(degreeToIntervalMap[degree]);
    })

    for(let i = 0; i < options.omit.length; i++) {
        for(let j = 0; j < intervalArr.length; j++) {
            if(options.omit[i] == intervalArr[j]);
            intervalArr.splice(i, 1);
        }
    }

    let rootInterval = noteMap[options.root];

    let result = [options.root];


    for (let interval of intervalArr) {
        let octave = range;
        while (interval >= 12) {
            interval = interval - 12;
            octave++;
        }

        let noteKey = intervalMap[rootInterval + interval][signIndex];
        if (range) {
            result.push(noteKey + octave);
        } else {
            result.push(noteKey);
        }
    }

    return result;
}

function getRoot(str) {
    return str.slice(0, 1);
}

function getType(str) {
    let result = null;
    for (let i in typeMap) {
        let reg = new RegExp(`^[A-G](#|b)?(${i}\\d{0,2})`);

        if (result = str.match(reg)) {
            return result[2];
        }
    }
}

function getAdd(str) {
    let result = [];
    let reg = /add(\d{1,2})/g;

    let addItem;
    while (addItem = reg.exec(str)) {
        result.push(addItem[1]) // index从0开始
    }

    return result;
}

function getOmit(str) {
    let result = [];
    let reg = /omit(\d{1,2})/g;

    let addItem;
    while (addItem = reg.exec(str)) {
        result.push(addItem[1]) // index从0开始
    }

    return result;
}

function getOn(str) {
    let result = str.match(/\/([A-G](#|b)?)/);
    if (result) {
        return result[1];
    }
}

function strToOptions(str) {
    let options = {
        root: getRoot(str),
        type: getType(str),
        add: getAdd(str),
        omit: getOmit(str),
        on: getOn(str),
    }

    return options;
}

function reverseMap(map) {
    let newMap = Object.create(null);

    for (let i in map) {
        newMap[map[i]] = i;
    }

    return newMap;
}



export {
    getRoot,
    getType,
    getAdd,
    caculateChord,
    strToOptions,
    reverseMap
}