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
// import {initProgression} from './initProgression';

function updateTime() {
    requestAnimationFrame(updateTime);
    document.querySelector('#seconds').textContent = Transport.seconds.toFixed(2);
    document.querySelector('#time').textContent = context.currentTime.toFixed(2);
}

updateTime()

Transport.bpm.value = 90;

initChord();
initScaleChords();
// initProgression();