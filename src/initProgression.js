import {
    instance
} from './progression/index_rebuild'

function initProgression() {
    instance.$mount('#progression');
}

export {
    initProgression
}