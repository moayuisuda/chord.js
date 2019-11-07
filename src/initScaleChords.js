import {
    scaleChords
} from './rad.js/index'

import {
    AMSynth,
    Loop,
    Transport,
    Sampler,
    time
} from 'tone'


function initScaleChords() {
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
        
        let seven = document.querySelector('.scaleChords_seven').checked;
        let result
        try {
            result = scaleChords({
                root,
                type,
                seven
            }, 4);
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

            for (let chord of result) {
                let text = chord.join(' · ');
                let el = document.createElement('button');
                el.addEventListener('click', function () {
                    Transport.cancel();
                    Transport.stop();
                    let i = 0;
                    
                    new Loop(function(time){
                        synth.triggerAttackRelease(chord[i % chord.length]);
                        console.log(chord[i % chord.length]);
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