function handleFiles(e) {
    return new Promise((resolve, reject) => {
        let selectedFile = e.target.files[0];
        let reader = new FileReader();
        reader.readAsText(selectedFile);

        reader.onload = function (e) {
            resolve(e.target.result);
        };
    })

}

let timer;
function antiShake(fn) {
    clearTimeout(timer);

    timer = setTimeout(() => {
        fn();
    }, 500);
}

export {
    handleFiles,
    antiShake
}