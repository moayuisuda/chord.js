import {caculateChord, strToOptions} from './utils';

function getChord(strOrOptions, range, signType) {
    let options = {
        root: '', // C,D,Cb...(must)
        type: '', // M,m,m7,M7,sus2...(must)
        add: '', // 2,3,4,[2,3].....
        omit: '', // 2,3,4,[2,3].....
        on: '' // if you want a chord like 'C/G', set the root 'C', and the on 'G'
    }

    if(Object.prototype.toString.call(strOrOptions) == '[object Object]') {
        return caculate(strOrOptions, range, signType);
    } else {
        options = strToOptions(strOrOptions);
        return caculateChord(options, range, signType);
    }
}

export {getChord};