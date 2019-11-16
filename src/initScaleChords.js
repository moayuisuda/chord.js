import {
    scaleChords
} from './rad.js/index'


function initScaleChords() {

    document.querySelector('.scaleChords_btn').addEventListener('click', onScaleChords);
    let rootEl = document.querySelector('.scaleChords_root');
    let typeEl = document.querySelector('.scaleChords_type');

    rootEl.value =  'C';

    function onScaleChords(e) {
        let root = rootEl.value;
        let type = typeEl.options[typeEl.selectedIndex].value; // 选中值
        
        let result
        try {
            result = scaleChords({
                root,
                type
            });
        } catch (e) {
            console.log(e);
            return;
        }
        console.log('result', result);
        let container = document.querySelector('.scaleChords_result');
        if (result) {
            while (container.childNodes[0]) {
                container.removeChild(container.childNodes[0]);
            }

            for (let chordName of result) {
                let text = chordName;
                let el = document.createElement('span');
                el.className = 'result_item';
                el.innerHTML = text;
                container.appendChild(el);
            }
        }
        
    }
}

export {initScaleChords};