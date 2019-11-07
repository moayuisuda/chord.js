import {
    chord
} from './rad.js/index'

import {
    Synth,
    Transport
} from 'tone'

function initChord() {
    function antiShake(fn) {
        let timer = null;

        return function (e) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                fn(e);
            }, 2000);
        }
    }

    let synth = new Synth({
        oscillator: {
            type: 'sine'
        }
    }).toMaster();

    document.querySelector('.chord_input').addEventListener('input', antiShake(onChordInput));

    function onChordInput(e) {
        let text = e.target.value;
        console.log(text);
        let result
        try {
            result = chord(text, 4);
        } catch (e) {
            console.log(e);
            return;
        }
        console.log('result', result);
        if (result) {
            //set the attributes using the set interface
            //play a chord

            for (let i = 0; i <= result.length; i++) {
                Transport.schedule(function () {
                    if (i == result.length) {
                        Transport.stop();
                        Transport.cancel()
                    } else synth.triggerAttackRelease(result[i], '4n');
                }, `0:${i}:0`);
            }

            Transport.start();
        }
    }
}

export {initChord}