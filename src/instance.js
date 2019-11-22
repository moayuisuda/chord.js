import './theme/index.css'
import './theme/progression.css'

import {initChord} from './initChord';
import {initScale} from './initScale';
import {initScaleChords} from './initScaleChords'
import {lazyLoadProgression} from './initProgression';
import {isPC, wave} from './utils'

let flag = isPC();
if(!flag) alert('Use me with PC to get more fun!');
wave()

initChord();
initScale();
initScaleChords();
lazyLoadProgression();