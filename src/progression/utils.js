function createChordItemEl(instance, progression) {

    let pannel = createChordPannel(instance);
    let deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '×';
    el.appendChild(pannel);
    el.appendChild(deleteBtn);
    deleteBtn.addEventListener('click', () => {
        progression.remove(instance);
    })

    pannel.addEventListener('click', () => {
        instance.focus();
    })

    return el;
}

function createChordPannel(instance) {
    let el = document.querySelector('div');
    el.style.display = 'inline-block';
    el.style.width = instance.beat.split('/')[0] / instance.beat.split('/')[0] * 100 + 'px';
    el.innerHTML = `${instance.chord} ${instance.beat}`;
    return el;
}

export {createChordItemEl}