import {caculateChord, caculateScaleChords, caculateScale} from './caculators';
import {strToOptions} from './utils';



function chord(strOrOptions, initOctave, signType) {

    let chordArr = (Object.prototype.toString.call(strOrOptions) === '[object Object]')
    ? caculateChord(strOrOptions, initOctave, signType)
    : caculateChord(strToOptions(strOrOptions), initOctave, signType);

    return chordArr;
}


function scale(options, initOctave, signType) {
    return caculateScale(options, initOctave, signType);
}


function scaleChords(options) {
    return caculateScaleChords(options);
}



export {chord, scale, scaleChords};