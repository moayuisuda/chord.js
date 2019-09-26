import {
    typeMap,
    noteMap,
    intervalMap,
    degreeMap
} from './source'


function caculateChord({root, type, add, omit, on}, initOctave, signType) {
    let
        result = [],
        intervalArr = typeToInterval(type),
        rootInterval = noteMap[root];

    add.map(degree => {
        intervalArr.push(degreeMap[degree]);
    })

    intervalArr.sort((a, b) => {
        return a - b;
    });

    for (let i = 0; i < omit.length; i++) {
        for (let j = 0; j < intervalArr.length; j++) {
            if (omit[i] == intervalArr[j]);
            intervalArr.splice(i, 1);
        }
    }

    let abInterval = absoluteInterval(rootInterval, intervalArr)
    if (initOctave) result = intervalArrToNotesR(abInterval, initOctave, signType);
    else result = intervalArrToNotes(abInterval, signType);

    if (on) replaceRoot(result, on, initOctave);
    return result;
}

function typeToInterval(type) {
    let result = typeMap.get(type);
    if (!result) throw `can't find a chord type matched ${type}`;
    return result;
}

function getSignIndex(signType) {
    return (signType == '#' || !signType) ? 0 : 1;
}

function replaceRoot(result, note, initOctave) {
    if (initOctave) {
        let root = result[0];
        let flagInterval = noteMap[result[1]];
        let noteInterval = noteMap[note];

        if (flagInterval = noteInterval) return;
        else if (flagInterval > noteInterval) {
            result.splice(0, 1, note + initOctave);
        } else {
            result.splice(0, 1, note + (initOctave - 1));
        }

        result.push(getRoot(root) + (getNumber(root) + 1));
    } else {
        result.unshift(note);
    }
}

function absoluteInterval(rootInterval, intervalArr) {
    let result = [rootInterval];
    let absoluteInterval;

    for (let interval of intervalArr) {
        absoluteInterval = rootInterval + interval;
        result.push(absoluteInterval);
    }

    return result;
}

function intervalArrToNotesR(intervalArr, initOctave, signType) {

    let result = [],
        octave,
        note,
        noteKey,
        signIndex = getSignIndex(signType);


    for (let interval of intervalArr) {
        octave = initOctave;
        while (interval >= 12 && initOctave) {
            interval -= 12;
            octave++;
        }

        note = intervalMap[interval];
        noteKey = note[signIndex] ? note[signIndex] : note[0];

        result.push(noteKey + octave);
    }

    return result;
}

function intervalArrToNotes(intervalArr, signType) {
    let result = [],
        note,
        noteKey,
        signIndex = getSignIndex(signType);

    for (let interval of intervalArr) {
        while (interval >= 12 && initOctave) {
            interval -= 12;
        }

        note = intervalMap[interval];
        noteKey = note[signIndex] ? note[signIndex] : note[0];

        result.push(noteKey);

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
    for (let [key] of typeMap) {
        let reg = new RegExp(`^[A-G](#|b)?(${key}\\d{0,2})`);

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

function getScale({
    root,
    type,
    initOctave,
    signType
}) {
    let rootInterval = noteMap[root];
    let intervalArr = typeMap[type];
    let abIntervals = absoluteIntervals(rootInterval, intervalArr);

    if (initOctave) return intervalArrToNotesR(abIntervals, initOctave, signType);
    else return intervalArrToNotes(abIntervals, signType);
}

export {
    getScale,
    getRoot,
    getType,
    getAdd,
    caculateChord,
    strToOptions,
    reverseMap
}