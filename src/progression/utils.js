function createChordItemEl(chord, instance) {
    let el = document.createElement('div');
    let pannel = document.createElement('button');
    pannel.innerHTML = chord.join(' · ');
    let deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '×';
    el.appendChild(pannel);
    el.appendChild(deleteBtn);
    deleteBtn.addEventListener('click', () => {
        this.delete(instance);
    })

    return el;
}