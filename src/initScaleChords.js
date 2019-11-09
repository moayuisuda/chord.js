import {
    scaleChords,
    chord
} from './rad.js/index'

import {
    Loop,
    Transport,
    Sampler,
    Time
} from 'tone'


function initScaleChords() {
    console.log('time',Time('8n') + Time('8n'));
    let instrumentName = 'piano';
    let synth = new Sampler({
        'A4': 'file/' + instrumentName + '/A4.wav',
        'C4': 'file/' + instrumentName + '/C4.wav',
        'D#4': 'file/' + instrumentName + '/DSharp4.wav',
        'F#4': 'file/' + instrumentName + '/FSharp4.wav',
    }, {
        onload: () => {
            
        },
        baseUrl: 'http://localhost:3000/',
        release: 0.4,
        attack: 0
    }).toMaster();

    document.querySelector('.scaleChords_btn').addEventListener('click', onScaleChords);

    function onScaleChords(e) {
        let root = document.querySelector('.scaleChords_root').value;
        let typeSelector = document.querySelector('.scaleChords_type');
        let index = typeSelector.selectedIndex; // 选中索引
        let type = typeSelector.options[index].value; // 选中值
        
        let result
        try {
            result = scaleChords({
                root,
                type
            });
        } catch (e) {
            console.log(e);
            return;
        }
        console.log('result', result);
        let container = document.querySelector('.scaleChords_result');
        if (result) {
            while (container.childNodes[0]) {
                container.removeChild(container.childNodes[0]);
            }

            for (let chordName of result) {
                let notes = chord(chordName, 4);
                let text = chordName;
                let el = document.createElement('button');
                el.addEventListener('click', function () {
                    Transport.cancel();
                    Transport.stop();
                    let i = 0;
                    
                    new Loop(function(){
                        synth.triggerAttackRelease(notes[i % notes.length]);
                        console.log(notes[i % notes.length]);
                        i ++;
                    }, "8n").start(0).stop("1n");
                    Transport.start();
                    // Transport.cancel();
                })
                el.innerHTML = text;
                container.appendChild(el);
            }
        }
        
    }
}

export {initScaleChords};