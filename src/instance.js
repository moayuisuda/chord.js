import './theme/index.css'
import './theme/progression.css'

import {initChord} from './initChord';
import {initScale} from './initScale';
import {initScaleChords} from './initScaleChords'
import {initProgression} from './initProgression';
import {isPC} from './isPC'

// function updateTime() {
//     requestAnimationFrame(updateTime);
//     document.querySelector('#seconds').textContent = Transport.seconds.toFixed(2);
//     document.querySelector('#time').textContent = context.currentTime.toFixed(2);
// }
// updateTime()

let flag = isPC();
if(!flag) alert('Use me with PC to get more fun!');

initChord();
initScale();
initScaleChords();
initProgression();