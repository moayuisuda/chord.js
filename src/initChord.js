import {
    chord
} from './chord.js/index'

function initChord() {
    let nameEl = document.querySelector('.chord_name');
    let octaveEl = document.querySelector('.chord_octave');
    let signTypeEl = document.querySelector('.chord_signType');

    nameEl.value = 'Cm7';
    octaveEl.value = 4;
    signTypeEl.value = '#'

    document.querySelector('.chord_btn').addEventListener('click', getChordArr)

    function getChordArr(e) {
        let name = nameEl.value;
        let octave = octaveEl.value;
        let signType = signTypeEl.value;

        let result
        try {
            result = chord(name, octave, signType);
            console.log('chord', result);
        } catch (e) {
            console.log(e);
            return;
        }

        let container = document.querySelector('.chord_result');
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
    initChord
}