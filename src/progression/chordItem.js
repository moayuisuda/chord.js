import {Transport, context, Time} from 'tone'
import { transcode } from 'buffer';


class ChordItem {
    constructor({chord, loop, time, single, amount, instance}) {
        this.chord = chord;
        this.loop = loop;
        this.time = time;
        this.single = single,
        this.amount = amount,
        this.instance = instance;
    }

    focus() {
        Transport.position = Time(this.start) - Time('32n');
        if(!this.instance.playing) {
            Transport.start();
            Transport.stop(context.currentTime + this.time);
        }
    }

    setFlag() {
        this.instance.flag = this.flag;
    }

    overFlag() {
        this.instance.flag ++;
    }
}

export {ChordItem}