import {Transport} from 'tone'


class ChoedItem {
    constructor({chord, loop, time, el, progression}) {
        this.loop = loop;
        this.time = time;
        this.el = el;
        this.isplaying = false;
        this.progression = progression;
    }

    focus() {
        if(!this.isplaying) {
            Transport.stop();
            Transport.start(this.start);
            Transport.stop(this.stop);
            this.el.classList.add('focus');
        } else {
            Transport.start(this.start);
            this.pregression.setIndex(this.index);
        }
    }

    blur() {
        this.el.classList.remove('focus');
    }
}

export {ChoedItem}