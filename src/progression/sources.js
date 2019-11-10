import {Loop} from 'tone'

let template =
 `<input class="progression_input--chord"></input>
<input class="progression_input--amount" type="number"></input>/<input class="progression_input--single" type="number"></input>
<div class="progression_input--result"></div>
<button class="progression_add">＋</button>
<button class="progression_btn">START</button>
`

let loopMap = {
    // time: the real time when the loop is fired
    // single: the time of each loop
    default: function(synth, chord, time, single) {
        synth.triggerAttackRelease(chord, '4n');
    }
}

export {template, loopMap}