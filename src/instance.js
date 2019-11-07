import './theme/index.css'
import {
    Transport,
    Synth,
    context
} from 'tone'

import {
    initChord
} from './initChord';
import {
    initScaleChords
} from './initScaleChords'

function updateTime() {
    requestAnimationFrame(updateTime)
    //the time elapsed in seconds
    document.querySelector('#seconds').textContent = Transport.seconds.toFixed(2)
    //the AudioContext time
    document.querySelector('#time').textContent = context.currentTime.toFixed(2)
}
updateTime()

Transport.bpm.value = 120;

var synth = new Synth().toMaster()

initChord();
initScaleChords();