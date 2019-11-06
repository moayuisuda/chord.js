import {caculateChord, caculateScaleChords} from './caculators';
import {strToOptions} from './utils';



function chord(strOrOptions, initOctave, signType) {

    // validateChord(arguments);

    return (Object.prototype.toString.call(strOrOptions) === '[object Object]')
    ? caculateChord(strOrOptions, initOctave, signType)
    : caculateChord(strToOptions(strOrOptions), initOctave, signType);
}


function scaleChords(options, initOctave, signType) {

    // validateScaleChords(arguments);

    return caculateScaleChords(options, initOctave, signType);
}

export {chord, scaleChords};