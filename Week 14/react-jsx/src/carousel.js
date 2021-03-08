import { Component } from './framework.js';
export class Carousel extends Component {
    constructor() {
        super();
        this.attributes = Object.create(null);
    }
    setAttribute(name, value) {
        this.attributes[name] = value;
    }
    render() {
        this.root = document.createElement('div');
        this.root.classList.add('box');
        for(let record of this.attributes.src) {
            let child = document.createElement('div');
            child.style.backgroundImage = `url('${record}')`;
            this.root.appendChild(child);
        }
        
        let position = 0;

        this.root.addEventListener('mousedown', e => {
            let children = this.root.children;
            let startX = e.clientX;

            let move = e => {
                let moveX = e.clientX - startX;
                let current = position - ((moveX - moveX % 500) / 500);
                
                for(let offset of [-1, 0, 1]) {
                    let pos = current + offset;
                    pos = (pos + children.length) % children.length;

                    children[pos].style.transition = 'none';
                    children[pos].style.transform = `translateX(${- pos * 500 + offset * 500 + moveX % 500}px)`;
                }
            }
            let up = e => {
                let moveX = e.clientX - startX;
                position = position - Math.round(moveX / 500);
                for(let child of children) {
                    child.style.transition = '';
                    child.style.transform = `translateX(${- position * 500}px)`
                }
                document.removeEventListener('mousemove', move);
                document.removeEventListener('mouseup', up);
            }
            document.addEventListener('mousemove', move)
            document.addEventListener('mouseup', up)
        })

        /*let currentIndex = 0;
         setInterval(() => {
            let children = this.root.children;
            let nextIndex = (currentIndex + 1) % children.length;

            let current = children[currentIndex];
            let next = children[nextIndex];

            next.style.transition = 'none';
            next.style.transform = `translateX(${100 - nextIndex * 100}%)`
            setTimeout(() => {
                next.style.transition = "";
                current.style.transform = `translateX(${-100 - currentIndex * 100}%)`;
                next.style.transform = `translateX(${- nextIndex * 100}%)`;
                currentIndex = nextIndex;
            }, 16)
        }, 3000) */
        return this.root;
    }
    mountTo(parent) {
        parent.appendChild(this.render());
    }
}