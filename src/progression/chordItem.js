import {Transport, context, Time} from 'tone'
import { transcode } from 'buffer';


class ChordItem {
    constructor({chord, loop, single, amount, instance, start, stop, flag, type}) {
        this.chord = chord;
        this.loop = loop;
        this.single = single;
        this.amount = amount;
        this.instance = instance;
        this.start = start;
        this.stop = stop;
        this.flag = flag;
        this.type = type;
    }

    focus() {
        Transport.position = Time(this.start) - Time('32n');
        if(!this.instance.playing) {
            Transport.start();
            Transport.stop(context.currentTime + this.amount * Time(`${this.single}n`));
        }
    }

    setFlag() {
        this.instance.flag = this.flag;
    }
}

export {ChordItem}