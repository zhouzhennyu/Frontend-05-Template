

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

function go() {
    green();
    setTimeout(() => {
        yellow();
        setTimeout(() => {
            red();
            setTimeout(() => {
                go();
            }, 5000);
        }, 2000) 
    }, 10000)
}
go();