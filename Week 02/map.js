let saveBtn = document.getElementById('save');
saveBtn.addEventListener('click', function() {
    localStorage['map'] = JSON.stringify(map)
})

let map = localStorage['map'] ? JSON.parse(localStorage['map']) : Array(10000).fill(0);
let container = document.getElementById('container');

for (let y = 0; y < 100; y++) {
    for (let x = 0; x < 100; x++) {
        let cell = document.createElement('div');
        cell.classList.add('cell');

        if (map[100*y + x] == 1) {
            cell.style.backgroundColor = 'black';
        }
        cell.addEventListener('mousemove', () => {
            if (mousedown) {
                if (clear) {
                    cell.style.backgroundColor = '';
                    map[100*y + x] = 0;
                } else {
                    cell.style.backgroundColor = 'black';
                    map[100*y + x] = 1;
                }
            }
        })
        container.appendChild(cell);
    }  
}

let mousedown = false;
let clear = false;
document.addEventListener('mousedown', e => {
    mousedown = true;
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

// 寻路逻辑
async function findPath(map, start, end) {
    let table = Object.create(map);
    var queue = [start];
    
    // 将寻找的点插入队列
    async function insert(x, y, pre) {
        if (x < 0 || x > 100 || y < 0 || y > 100) {
            return;
        }
        if (table[y * 100 + x]) {
            return;
        }
        // await sleep(10);
        container.children[y * 100 + x].style.backgroundColor = 'lightgreen';
        table[y * 100 + x] = pre;
        queue.push([x, y]);
    }
    while(queue.length) {
        let [x, y] = queue.shift();
        console.log(x, y);
        if (x === end[0] && y === end[1]) {
            let path = [];
            while(x != start[0] || y != start[1]) {
                path.push(map[y * 100 + x]);
                [x, y] = table[y * 100 + x];
                await sleep(10);
                container.children[y * 100 + x].style.backgroundColor = 'purple';
            }
            return path;
        }
        await insert(x, y - 1, [x, y])  //上
        await insert(x, y + 1, [x, y])  //下
        await insert(x - 1, y, [x, y])  //左
        await insert(x + 1, y, [x, y])  //右

        await insert(x - 1, y - 1, [x, y])  //左上
        await insert(x - 1, y + 1, [x, y])  //左下
        await insert(x + 1, y - 1, [x, y])  //右上
        await insert(x + 1, y + 1, [x, y])  //右下
    }
    return null;
}

