import {
    Time,
    Transport,
    Loop,
    Ticks,
} from 'tone'
import {
    template,
    loopMap,
    synth
} from './sources'
import {
    chord as getChord
} from '../rad.js/index'
import {
    ChordItem
} from './chordItem'
import Vue from 'vue/dist/vue.js'
let count = 0;

let instance = new Vue({
    template,
    data: {
        flag: 0,
        bpm: 70,
        type: 'scale',
        types: [
            'scale'
        ],
        input: {
            single: '4',
            amount: '4',
            chord: 'C'
        },
        initOctive: 4,
        timeline: [],
        playing: false
    },

    watch: {
        bpm: {
            handler(val, oldVal) {
                Transport.bpm.value = val;
                this.caculateTime();
                let tile = this.timeline[this.timeline.length - 1];
                if (tile) {
                    Transport.loopEnd = this.timeline[this.timeline.length - 1].stop;
                    Transport.loop = true;
                } else Transport.loopEnd = false;
            },
            immediate: true
        },
        'timeline.length': {
            handler(val) {
                let tile = this.timeline[this.timeline.length - 1];
                if (tile) {
                    Transport.loopEnd = this.timeline[this.timeline.length - 1].stop;
                    Transport.loop = true;
                } else Transport.loopEnd = false;
            },
        }
    },

    methods: {
        toggle() {
            if (this.playing) this.stop();
            else this.start();
        },

        start() {
            this.playing = true;
            Transport.stop();
            this.caculateTime();
            Transport.start();
        },

        stop() {
            this.playing = false;
            this.flag = this.timeline.length - 1;
            Transport.stop();
        },

        // single is one beat length, and amount is how many times this beat would be triggered.
        add() {
            let {
                amount,
                single,
                chord
            } = this.input;
            let chordArr
            try {
                chordArr = getChord(chord, this.initOctive);
            } catch (e) {
                console.log(e);
                return;
            }

            if (!(amount.match(/^\d$/) && single.match(/^\d$/)))
                throw `[Rad-Club] The parameter "${amount}/${single}" is not valid`

            let time = Time(`${single}n`) * amount,
                loop = new Loop((time) => {
                    loopMap[this.type](synth, chordArr, time, single);
                }, `${single}n`),
                chordItem = new ChordItem({
                    chord,
                    loop,
                    time,
                    amount,
                    single,
                    instance: this
                })

            this.timeline.splice(this.flag + 1, 0, chordItem);
            this.caculateTime();

            console.log(chordItem.flag, count ++);

            // only when focus() is invoked can flag be added, if you call add() very quickly, an  the focus have a 32n delay, so you will see a
            // bug which the flag is not set on the last ChordItem in the timeline.
            this.timeline[chordItem.flag].focus();
        },

        remove(instance) {
            this.timeline.splice(instance.flag, 1);
            this.caculateTime();
        },

        caculateTime() {
            let timeFlag = 0;
            let flag = 0;
            for (let item of this.timeline) {
                let {
                    time,
                    loop
                } = item;

                let start = timeFlag;
                timeFlag += time;
                let stop = timeFlag;

                item.start = start;
                item.stop = stop;
                item.flag = flag ++;

                loop.cancel();
                loop.start(start);
                loop.stop(stop);

                Transport.schedule((time) => {
                    item.setFlag();
                }, start);

                Transport.schedule((time) => {
                    item.overFlag();
                }, stop);
            }
        }
    }
})

export {
    instance
}