let container = document.getElementById('container');
let saveBtn = document.getElementById('save');
let map = localStorage['map'] ? JSON.parse(localStorage['map']) : Array(10000).fill(0);

saveBtn.addEventListener('click', () => {
    localStorage['map'] = JSON.stringify(map);
})

for (let y = 0; y < 100; y++) {
    for (let x = 0; x < 100; x++) {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        if (map[100 * y + x]) {
            cell.style.backgroundColor = 'black';
        }
        cell.addEventListener('mousemove', () => {
            if (mouseDown) {
                if (clear) {
                    map[100 * y + x] = 0;
                    cell.style.backgroundColor = '';
                } else {
                    map[100 * y + x] = 1;
                    cell.style.backgroundColor = 'black';
                }
            }
        })
        container.appendChild(cell);
    }
}

let mouseDown = false;
let clear = false;
container.addEventListener('mousedown', (e) => {
    mouseDown = true;
    clear = (e.which === 3)
});
document.addEventListener('mouseup', () => {
    mousedown = false;
});
container.addEventListener('contextmenu', e => e.preventDefault());
function sleep(t) {
    return new Promise((resolve) => {
        setTimeout(resolve, t);
    })
}

class Sorted {
    constructor(data, compare) {
        this.data = data.slice();
        this.compare = compare || ((a, b) => a -b);
    }
    take() {
        if (!this.data.length) {
            return;
        }
        let min = this.data[0];
        let minIndex = 0;

        for (let i = 1; i < this.data.length; i++) {
            if (this.compare(this.data[i], min) < 0) {
                min = this.data[i];
                minIndex = i;
            }
        }
        this.data[minIndex] = this.data[this.data.length -1];
        this.data.pop();
        return min;
    }

    give(v) {
        this.data.push(v)
    }
}

// 寻路逻辑
async function findPath(map, start, end) {
    let table = Object.create(map);
    // let queue = [start];
    let queue = new Sorted([start], (a, b) => distance(a) - distance(b));
    async function insert(x, y, pre) {
        if (x < 0 || x >= 100 || y < 0 || y >= 100) {
            return;
        }
        if (table[y * 100 + x]) {
            return;
        }
        await sleep(5)
        container.children[y * 100 + x].style.backgroundColor = 'lightgreen';
        table[y * 100 + x] = pre;
        // queue.push([x, y]);
        queue.give([x, y]);
    }
    function distance(point) {
        return (point[0] - end[0]) ** 2 + (point[1] - end[1]) ** 2;
    }

    while(queue.data.length) {
        // let [x, y] = queue.shift();
        let [x, y] = queue.take();
        console.log(x, y);
        if (x === end[0] && y === end[1]) {
            let path = [];

            while(x != start[0] || y != start[1]) {
                path.push(map[y * 100 + x]);
                [x, y] = table[y * 100 + x];
                // await sleep(10)
                container.children[y * 100 + x].style.backgroundColor = 'purple';
            }
            console.log('path', path);
            return path;
        }

        await insert(x, y - 1, [x, y])  //上
        await insert(x - 1, y, [x, y])  //左
        await insert(x + 1, y, [x, y])  //右
        await insert(x, y + 1, [x, y])  //下
        await insert(x - 1, y - 1, [x, y])  //左上
        await insert(x + 1, y - 1, [x, y])  //右上
        await insert(x - 1, y + 1, [x, y])  //左下
        await insert(x + 1, y + 1, [x, y])  //右下
    }

    return null;

}

