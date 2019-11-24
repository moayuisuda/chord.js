function wave() {
    let waveOne = document.querySelector('.wave--one');
    let waveTwo = document.querySelector('.wave--two');
    waveOne.style.animationDuration = Math.ceil(360 / 70) + 's';
    waveTwo.style.animationDuration = Math.ceil(360 / 70) + 's';
}

function isPC() {
    let userAgentInfo = navigator.userAgent;
    let Agents = ["Android", "iPhone",
                "SymbianOS", "Windows Phone",
                "iPad", "iPod"];
    let flag = true;
    for (let v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

export {wave, isPC}