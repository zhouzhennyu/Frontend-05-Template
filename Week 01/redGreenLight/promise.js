function green() {
    let lights = document.getElementsByTagName('div');
    for (let i = 0; i < 3; i++) {
        lights[i].classList.remove('light');
    }
    document.getElementsByClassName('green')[0].classList.add('light')
}

function yellow() {
    let lights = document.getElementsByTagName('div');
    for (let i = 0; i < 3; i++) {
        lights[i].classList.remove('light');
    }
    document.getElementsByClassName('yellow')[0].classList.add('light')
}
function red() {
    let lights = document.getElementsByTagName('div');
    for (let i = 0; i < 3; i++) {
        lights[i].classList.remove('light');
    }
    document.getElementsByClassName('red')[0].classList.add('light')
}

function sleep(t) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, t);
    })
}

function go() {
    green();
    sleep(3000).then(() => {
        yellow();
        return sleep(1000);
    }).then(() => {
        red();
        return sleep(2000)
    }).then(() => {
        go();
    })
}