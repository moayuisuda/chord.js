import {caculateChord, caculateScaleChords, caculateScale} from './caculators';
import {strToOptions} from './utils';



function chord(strOrOptions, initOctave, signType) {

    return (Object.prototype.toString.call(strOrOptions) === '[object Object]')
    ? caculateChord(strOrOptions, initOctave, signType)
    : caculateChord(strToOptions(strOrOptions), initOctave, signType);
}


function scale(options, initOctave, signType) {
    return caculateScale(options, initOctave, signType);
}


function scaleChords(options, initOctave, signType) {
    return caculateScaleChords(options, initOctave, signType);
}



export {chord, scale, scaleChords};