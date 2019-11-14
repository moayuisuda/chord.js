import {
    scaleChords
} from './rad.js/index'


function initScaleChords() {

    document.querySelector('.scaleChords_btn').addEventListener('click', onScaleChords);

    function onScaleChords(e) {
        let root = document.querySelector('.scaleChords_root').value;
        let typeSelector = document.querySelector('.scaleChords_type');
        let index = typeSelector.selectedIndex; // 选中索引
        let type = typeSelector.options[index].value; // 选中值
        
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