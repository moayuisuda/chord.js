import * as utils from './utils';
import * as conve from './converters'

function caculateChord({
    root,
    type,
    add,
    omit,
    on
}, initOctave, signType = '#') {
    let
        result = [],
        intervalArr = conve.typeToIntervalArr(type),
        rootInterval = conve.noteToInterval(root);


    add.map(degree => {
        intervalArr.push(conve.degreeToInterval(degree));
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

    let abInterval = conve.absoluteIntervalArr(rootInterval, intervalArr)
    if (initOctave) result = conve.intervalArrToNotesO(abInterval, initOctave, signType);
    else result = conve.intervalArrToNotes(abInterval, signType);

    if (on) utils.replaceRoot(result, on, initOctave);
    return result;
}


function caculateScale({
    root,
    type,
}, initOctave, signType = '#') {
    let rootInterval = conve.noteToInterval(root),
        scale = typeToScale[type],
        intervalArr = conve.scaleToIntervalArr(scale),
        abIntervalArr = conve.absoluteIntervalArr(rootInterval, intervalArr);

    if (initOctave) return conve.intervalArrToNotesO(abIntervalArr, initOctave, signType);
    else return conve.intervalArrToNotes(abIntervalArr, signType);
}


function caculateScaleChords({
    root,
    type
}, initOctave, signType = '#') {
    let
        chordsArr = [],
        extendIntervalArr = [],

        rootInterval = conve.noteToInterval(root),
        intervalArr = conve.scaleToIntervalArr(conve.typeToScale(type)),
        abIntervalArr = conve.absoluteIntervalArr(rootInterval, intervalArr);

    // get the intervalArr with three more notes in a scale
    extendIntervalArr = extendIntervalArr.concat(abIntervalArr);
    for (let i = 1; i < 5; i++) {
        extendIntervalArr.push(abIntervalArr[i] + 12);
    }

    let notes = initOctave ?
        conve.intervalArrToNotesO(extendIntervalArr, initOctave, signType) :
        conve.intervalArrToNotes(extendIntervalArr, initOctave);

    for (let i = 0; i < abIntervalArr.length; i++) {
        chordsArr.push([notes[i], notes[i + 2], notes[i + 4]]);
    }

    return chordsArr;
}

export {
    caculateChord,
    caculateScaleChords,
    caculateScale
}