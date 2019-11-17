import { join } from "path";

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

function handleFiles(e) {
    return new Promise((resolve, reject) => {
        var selectedFile = e.target.files[0]; //获取读取的File对象
        var name = selectedFile.name; //读取选中文件的文件名
        var size = selectedFile.size; //读取选中文件的大小
        var reader = new FileReader(); //这里是核心！！！读取操作就是由它完成的。
        reader.readAsText(selectedFile); //读取文件的内容
    
        reader.onload = function (e) {
            resolve(e.target.result);
        };
    })

}

export {
    createChordItemEl,
    handleFiles
}