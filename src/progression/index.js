import {
    Time,
    Transport,
    Loop,
    Synth
} from 'tone'

import {template} from './sources'
import * as utils from './utils'

import './index.css'

class Progression {
    constructor(container, bpm) {
        Transport.bpm.value = bpm;
        this.timeline = [];
        this.container = container;
        this.flag = 0;
        this.synth = new Synth({
            oscillator: {
                type: 'sine'
            }
        }).toMaster();
        this.playing = false;
        this.init();
    }

    init() {
        this.el.innerHTML = template;

        document.querySelector(".progression_add").addEventListener('click', () => {
            let chordArr = chord(inputChord.value, 4);
            this.add(chordArr, [inputAmount.value, inputSingle.value]);
        })
        document.querySelector(".progression_start").addEventListener('click', () => {
            this.start();
        })
        document.querySelector(".progression_stop").addEventListener('click', () => {
            this.stop();
        })
    }

    start() {
        this.playing = true;
        Transport.cancel();
        Transport.stop();
        this.caculateTime();
        Transport.start();
    }

    focus(instance) {
        if(!this.playing) {
            this.flag = instance.flag;
            for(let i of this.timeline) {
                this.blur(i);
            }
            el.classList.push('focus');
        }

        if(this.playing) {
            Transport.start(instance.start);
            for(let i of this.timeline) {
                i.el.classList.pop();
            }
            el.classList.push('focus');
        }
    }

    blur(instance) {
        if(!this.playing) {
            this.flag = this.timeline.length;
            el.classList.pop();
        }

        if(this.playing) {
            Transport.start(instance.start);
            for(let i of this.timeline) {
                i.el.classList.pop();
            }
            el.classList.push('focus');
            el.classList.push('focus');
        }
    }

    stop() {
        this.playing = false;
        Transport.cancel();
        Transport.stop();
    }

    // single is one beat length, and amount is how many times this beat would be trigger.
    add(chord, [amount = 4, single = 4]) {
        
        if (!(amount.match(/^\d$/) && single.match(/^\d$/)))
        throw `[Rad-Club] The parameter "${amount}/${single}" is not valid`

        let time = Time(`${single}n`) * amount;

        // single beat
        let loop = new Loop(() => {
                // what to do in a single beat
                for (let i = 0; i < 8; i++) {
                    // debugger
                    this.synth.triggerAttackRelease(chord, `${single}n`);
                    console.log(chord[i % chord.length], i);
                }
        }, `${single}n`)

        let el = document.createElement('div');
        let instance = {
            loop,
            time,
            el
        }
        this.timeline.splice(this.flag, 0, instance);

        el.innerHTML = chord.join(' · ');
        el.addEventListener('click', () => {

        })

        let deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '×';
        deleteBtn.addEventListener('click', () => {
            this.delete(instance);
        })

        el.appendChild(deleteBtn);
        this.container.appendChild(el);
    }

    delete(instance) {
        instance.loop.cancel();
        for(let i in this.timeline) {
            if(i === instance) {
                this.timeline.splice(i, 1);
            }
        }
        this.container.removeChild(instance.el);
        this.caculateTime();
    }

    caculateTime() {
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
            item.flag = flag;

            timeFlag += time;
            flag ++;
        }


        for(let instance of this.timeline) {
            Tone.Transport.schedule(function(time){
                this.focus(instance);
            }, item.start);
        }
    }
}

export {
    Progression
}