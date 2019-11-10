import {
    Progression
} from './progression/index'

function initProgression() {
    new Progression(document.querySelector("#progression"), 90);
}

export {
    initProgression
}