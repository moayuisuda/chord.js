import {
    chord,
    scaleChords
} from './rad.js/index'
import './theme/index.css'
import {
    PolySynth,
    Synth,
    Transport
} from 'tone'

function antiShake(fn) {
    let timer = null;

    return function (e) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn(e);
        }, 2000);
    }
}

Transport.bpm.value = 120;
let synth = new Synth().toMaster();

document.querySelector('.chord_input').addEventListener('input', antiShake(onChordInput));

function onChordInput(e) {
    let text = e.target.value;
    let result = chord(text, 4);
    console.log('result', result);
    if (result) {
        //set the attributes using the set interface
        //play a chord
        
        for(let i = 0;  i <= result.length; i ++) {
            Transport.schedule(function(){

                if(i == result.length) {
                    Transport.stop();
                }

                else synth.triggerAttackRelease(result[i], '4n');
            }, `0:${i}:0`);
        }

        Transport.start();
    }
}