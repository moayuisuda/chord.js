import {
    typeMap,
    noteMap,
    intervalMap,
    scaleMap
} from './maps'



function typeToInterval(type) {
    let result = typeMap.get(type);
    if (!result) throw `can't find a chord type matched ${type}`;
    return result;
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


// Get all the absolute intervals, the result array will convert to notes directly.
function absoluteIntervalArr(rootInterval, intervalArr) {
    let result = [rootInterval];
    let abInterval;

    for (let interval of intervalArr) {
        abInterval = rootInterval + interval;
        result.push(abInterval);
    }

    return result;
}


function intervalArrToNotesO(intervalArr, initOctave, signType) {

    let result = [],
        octave,
        note,
        noteKey,
        signIndex = getSignIndex(signType);

    for (let interval of intervalArr) {
        octave = initOctave;
        while (interval >= 12) {
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
        while (interval >= 12) {
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

function getSignIndex(signType) {
    return (signType == '#') ? 0 : 1;
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
}, initOctave, signType = '#') {
    let rootInterval = noteMap[root],
        scale = scaleMap[type],
        intervalArr = scaleToInterval(scale),
        abIntervalArr = absoluteIntervalArr(rootInterval, intervalArr);

    if (initOctave) return intervalArrToNotesO(abIntervalArr, initOctave, signType);
    else return intervalArrToNotes(abIntervalArr, signType);
}

function scaleToInterval(intervalArr) {
    let result = [];

    for (let i = 0; i < intervalArr.length; i++) {
        if (!i) result.push(intervalArr[i]);
        else {
            result.push(result[i - 1] + intervalArr[i]);
        }
    }

    return result;
}


export {
    getScale,
    getRoot,
    getType,
    getAdd,
    strToOptions,
    reverseMap,
    intervalArrToNotes,
    intervalArrToNotesO,
    typeToInterval,
    replaceRoot,
    absoluteIntervalArr,
    scaleToInterval
}