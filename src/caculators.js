import * as utils from './utils';
import {
    noteMap,
    degreeMap,
    scaleMap
} from './maps'

function caculateChord({
    root,
    type,
    add,
    omit,
    on
}, initOctave, signType = '#') {
    let
        result = [],
        intervalArr = utils.typeToInterval(type),
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

    let abInterval = utils.absoluteIntervalArr(rootInterval, intervalArr)
    if (initOctave) result = utils.intervalArrToNotesO(abInterval, initOctave, signType);
    else result = utils.intervalArrToNotes(abInterval, signType);

    if (on) utils.replaceRoot(result, on, initOctave);
    return result;
}

function caculateScaleChords({
    root,
    type
}, initOctave, signType = '#') {
    let
        chordsArr = [],
        extendIntervalArr = [],

        rootInterval = noteMap[root],
        intervalArr = utils.scaleToInterval(scaleMap[type]),
        abIntervalArr = utils.absoluteIntervalArr(rootInterval, intervalArr);

    // get the intervals with three more notes in a scale
    extendIntervalArr = extendIntervalArr.concat(abIntervalArr);
    for (let i = 1; i < 5; i++) {
        extendIntervalArr.push(abIntervalArr[i] + 12);
    }

    let notes = initOctave ?
        utils.intervalArrToNotesO(extendIntervalArr, initOctave, signType) :
        utils.intervalArrToNotes(extendIntervalArr, initOctave);

    for (let i = 0; i < abIntervalArr.length; i++) {
        chordsArr.push([notes[i], notes[i + 2], notes[i + 4]]);
    }

    return chordsArr;
}

export {
    caculateChord,
    caculateScaleChords
}