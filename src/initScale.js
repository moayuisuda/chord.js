import {
    scale
} from './rad.js/index'

function initScale() {
    let rootEl = document.querySelector('.scale_root');
    let typeEl = document.querySelector('.scale_type');
    let octaveEl = document.querySelector('.scale_octave');
    let signTypeEl = document.querySelector('.scale_signType');
    rootEl.value = 'C';
    typeEl.selectedIndex = 0;
    octaveEl.value = 4;
    signTypeEl.value = '#';

    document.querySelector('.scale_btn').addEventListener('click', getscaleArr)

    function getscaleArr(e) {
        let root = rootEl.value;
        let type = typeEl.options[typeEl.selectedIndex].value;
        let octave = octaveEl.value;
        let signType = signTypeEl.value;

        let result
        try {
            result = scale({root, type}, octave, signType);
        } catch (e) {
            console.log(e);
            return;
        }

        let container = document.querySelector('.scale_result');
        if (result) {
            while (container.childNodes[0]) {
                container.removeChild(container.childNodes[0]);
            }

            for (let noteName of result) {
                let text = noteName;
                let el = document.createElement('span');
                el.className = 'result_item';
                el.innerHTML = text;
                container.appendChild(el);
            }

        }
    }
}

export {
    initScale
}