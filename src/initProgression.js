import {
    Progression
} from './progression/index'

function initProgression() {
    new Progression(document.querySelector(".progression_input--result"), 90);
}

export {
    initProgression
}