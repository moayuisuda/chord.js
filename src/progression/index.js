import {
    Time,
    Transport,
    Loop,
    Synth,
    PolySynth
} from 'tone'

import {
    template, loopMap
} from './sources'
import {
    chord
} from '../rad.js/index'
import * as utils from './utils'

import './index.css'



class Progression {
    constructor(container, bpm) {
        Transport.bpm.value = bpm;
        this.timeline = [];
        this.container = container;
        this.synth = new PolySynth(3, Synth, {
            oscillator: {
                type: 'sine'
            }
        }).toMaster();
        this.playing = false;
        this.init();
    }

    init() {
        this.container.innerHTML = template;
        let inputAmount = document.querySelector('.progression_input--amount'),
            inputSingle = document.querySelector('.progression_input--single'),
            inputChord = document.querySelector('.progression_input--chord');

            [inputAmount.value, inputSingle.value] = [4, 4];

        document.querySelector(".progression_add").addEventListener('click', () => {
            let chordArr = chord(inputChord.value, 4);
            this.add(chordArr, [inputAmount.value, inputSingle.value]);
        })
        document.querySelector(".progression_btn").addEventListener('click', () => {
            this.toggle();
        })
    }


    toggle() {
        if(this.playing) this.stop();
        else this.start();
    }

    start() {
        let btn = document.querySelector('.progression_btn');
        btn.classList.add('focus');
        btn.innerHTML = 'STOP';
        this.playing = true;
        Transport.cancel();
        Transport.stop();
        this.caculateTime();
        Transport.start();
    }

    stop() {
        let btn = document.querySelector('.progression_btn');
        btn.classList.remove('focus');
        btn.innerHTML = 'START';
        this.playing = false;
        Transport.cancel();
        Transport.stop();
    }

    // single is one beat length, and amount is how many times this beat would be trigger.
    add(chord, [amount = 4, single = 4], type = 'default') {

        if (!(amount.match(/^\d$/) && single.match(/^\d$/)))
            throw `[Rad-Club] The parameter "${amount}/${single}" is not valid`

        let time = Time(`${single}n`) * amount;
        
        // single beat
        let loop = new Loop((time) => {
            // what to do in a single beat
                loopMap[type](this.synth, chord, time, single);
        }, `${single}n`)

        let instance = {
            loop,
            time,
            el
        }

        this.container.appendChild(utils.createChordItemEl(chord, instance));
        this.timeline.splice(this.index + 1, 0, instance);
        this.caculateTime();
    }

    remove(instance) {
        instance.loop.cancel();
        this.timeline.splice(instance.index, 1);
        this.container.removeChild(instance.el);
        this.caculateTime();
    }

    caculateTime() {
        Transport.cancel();
        let timeFlag = Time(0);
        let flag = 0;
        for (let item of this.timeline) {
            let {
                loop,
                time
            } = item;
            let start;
            if (!item.preLoop) start = 0;
            else start = timeFlag;

            let stop = start + time;
            loop.start(start);
            loop.stop(stop);

            item.start = start;
            item.stop = stop;
            item.flag = flag;

            timeFlag += time;
            flag++;

            Transport.schedule((time) => {
                this.focus(item);
            }, item.start);
            Transport.schedule((time) => {
                this.blur(item);
            }, item.stop);
        }
    }
}

export {
    Progression
}