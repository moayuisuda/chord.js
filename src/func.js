import {caculateChord, strToOptions} from './utils';

function chord(strOrOptions, initOctave, signType) {

    if(Object.prototype.toString.call(strOrOptions) == '[object Object]') {
        return caculate(strOrOptions, initOctave, signType);
    } else {
        let options = strToOptions(strOrOptions);
        return caculateChord(options, initOctave, signType);
    }
}



function scaleChords(root, type) {
    
}

export {chord};