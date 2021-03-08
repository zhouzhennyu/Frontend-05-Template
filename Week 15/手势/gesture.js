let element = document.documentElement;


element.addEventListener('mousedown', e => {
    let mousemove = e => {
        console.log(e.clientX, e.clientY);
    }
    let mouseup = e => {
        element.removeEventListener('mousemove', mousemove);
        element.removeEventListener('mouseup', mouseup)
    }
    element.addEventListener('mousemove', mousemove);
    element.addEventListener('mouseup', mouseup);
})

element.addEventListener('touchstart', e => {
    for (const touch of e.changedTouches) {
        console.log('start', touch.clientX, touch.clientY);
    }
})
element.addEventListener('touchmove', e => {
    for (const touch of e.changedTouches) {
        console.log('move', touch.clientX, touch.clientY);
    }
})
element.addEventListener('touchend', e => {
    for (const touch of e.changedTouches) {
        console.log('end', touch.clientX, touch.clientY);
    }
})