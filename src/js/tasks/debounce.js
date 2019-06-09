'use strict'

const debounce = (handler = () => {}, wait = 0, immediate = false) => {
    let id = null

    return function (...args) {
        const callNow = immediate && !id

        clearTimeout(id)
        id = setTimeout(() => {
            id = null
            
            if (!immediate) Reflect.apply(handler, this, [...args])
        }, wait)

        if (callNow) {
            Reflect.apply(handler, this, [...args])
        }
    }
};

let v = 0;
const launch = debounce(function (prefix = '') {
    this.c = this.c + 1

    console.log(`${prefix}_${Date.now()}`)

    if(this.c === 2) {
        throw new Error('boom')
    }

    return `${prefix}_${this.c}`
}, 100, true)

const o = {
    c: 0,
    l: launch
}

console.log(Date.now())

let a
try {
    a = o.l(1);
} catch (e) {

}
const b = o.l(2);
setTimeout(() => {
    let c
    try {
        c = o.l(3);
    } catch (e) {

    }
}, 200)

setTimeout(() => {
    let c
    try {
        c = o.l(4);
    } catch (e) {

    }
    console.log(c)
}, 300)

setTimeout(() => {
    let c
    try {
        c = o.l(5);
    } catch (e) {

    }
    console.log(c)
}, 400)

console.log(a, b);
console.log(a === b);
