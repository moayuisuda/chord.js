import {typeMap} from './maps'
import * as conve from './converters'

function getRoot(str) {
    let result = str.match(/[A-G](#|b)?/);
    if(result) return result[0];
    throw `[Rad] Can't resolve the root note for "${str}"`
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

    throw `[Rad] Can't find a chord type matched "${str}"`;
}


function getAdd(str) {
    let result = [];
    let reg = /add((#|b)?\d{1,2})/g;

    let addItem;
    while (addItem = reg.exec(str)) {
        result.push(addItem[1])
    }

    return result;
}


function getOmit(str) {
    let result = [];
    let reg = /omit((#|b)?\d{1,2})/g;

    let omitItem;
    while (omitItem = reg.exec(str)) {
        result.push(omitItem[1])
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


function replaceRoot(result, note, initOctave) {
    if (initOctave) {
        let root = result[0];
        let flagInterval = conve.noteToInterval(getRoot(result[1]));
        let noteInterval = conve.noteToInterval(note);

        if (flagInterval === noteInterval) return;
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

function copy(obj) {
    if(!(obj instanceof Object)) return obj;
    
    let result = Object.prototype.toString.call(obj) === '[object Object]' ? {} : [];
    for(let i in obj) {
        result[i] = (obj instanceof Object) ? copy(obj[i]) : obj[i];
    }

    return result;
}

function mapStringfy(map) {
    
    let stringMap = {};
    for(let [key, value] of map.entries()) {
        stringMap[value.join('-')] = key;
    }

    return stringMap;
}

export {
    getRoot,
    getType,
    getAdd,
    strToOptions,
    replaceRoot,
    getSignIndex,
    copy,
    mapStringfy
}