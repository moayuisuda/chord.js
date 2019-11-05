import {
    typeMap,
    noteMap,
    intervalMap,
    degreeMap
} from './source'


function caculateChord(options, range, signType) {
    let
        result = [],
        signIndex = (signType == '#' || !signType) ? 0 : 1,
        intervalArr = typeToInterval(options.type),
        rootInterval = noteMap[options.root];

    intervalArr.push(rootInterval);

    options.add.map(degree => {
        intervalArr.push(degreeMap[degree]);
    })

    intervalArr.sort((a, b) => {
        return a - b;
    });

    for (let i = 0; i < options.omit.length; i++) {
        for (let j = 0; j < intervalArr.length; j++) {
            if (options.omit[i] == intervalArr[j]);
            intervalArr.splice(i, 1);
        }
    }

    result = intervalArrToNotes(rootInterval, intervalArr, range, signIndex);
    if (options.on) replaceRoot(result, options.on, range);
    return result;
}

function typeToInterval(type) {
    let result = typeMap[type];
    if(!result) throw `can't find a chord type matched ${type}`;
    return result;
}


function replaceRoot(result, note, range) {
    if (range) {
        let root = result[0];
        let flagInterval = noteMap[result[1]];
        let noteInterval = noteMap[note];

        if(flagInterval = noteInterval) return;
        else if(flagInterval > noteInterval) {
            result.splice(0, 1, note + range);
        }
        else {
            result.splice(0, 1, note + (range - 1));
        }

        result.push(getRoot(root) + (getNumber(root) + 1));
    } else {
        result.unshift(note);
    }
}


function intervalArrToNotes(rootInterval, intervalArr, range, signIndex) {
    
    let result = [];

    for (let i = 0; i < intervalArr.length; i ++) {
        let interval = intervalArr[i];

        let absoluteInterval;
        if(i > 0) absoluteInterval = rootInterval + interval;
        else absoluteInterval = rootInterval;

        let octave = range;
        while (absoluteInterval >= 12) {
            absoluteInterval -= 12;
            octave++;
        }

        let note = intervalMap[absoluteInterval];
        let noteKey = note[signIndex] ? note[signIndex] : note[0];

        if (range) {
            result.push(noteKey + octave);
        } else {
            result.push(noteKey);
        }
    }

    return result;
}


function getRoot(str) {
    return str.match(/[A-G](#|b)?/)[0];
}

function getNumber(str) {
    return Number(str.match(/\d/)[0]);
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