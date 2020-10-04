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
// async function go() {
//     while(true) {
//         green();
//         await sleep(3000);
//         yellow();
//         await sleep(1000);
//         red();
//         await sleep(2000);
//     }
// }


function happen(ele, eventName) {
    return new Promise((resolve, reject) => {
        ele.addEventListener(eventName, resolve, { once: true })
    }) 
}

async function go() {
    while(true) {
        green();
        await happen(document.getElementById('next'), 'click');
        yellow();
        await happen(document.getElementById('next'), 'click');
        red();
        await happen(document.getElementById('next'), 'click');
    }
}