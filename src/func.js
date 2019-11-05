import {caculateChord, strToOptions} from './utils';

function getChord(strOrOptions, range, signType) {

    if(Object.prototype.toString.call(strOrOptions) == '[object Object]') {
        return caculate(strOrOptions, range, signType);
    } else {
        let options = strToOptions(strOrOptions);
        return caculateChord(options, range, signType);
    }
}

export {getChord};