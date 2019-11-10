import {
    scaleChords,
    chord
} from './rad.js/index'

import {
    Loop,
    Transport,
    Synth
} from 'tone'


function initScaleChords() {
    let synth = new Synth({
        oscillator: {
            type: 'sine'
        }
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
                        synth.triggerAttackRelease(notes[i % notes.length], '8n');
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