'use strict'

const list = {
    value: { a: 0 },
    next: {
        value: { a: 1 },
        next: {
            value: { a: 2 },
            next: null
        }
    }
}

console.log(reverseLoop(list))
console.log(reverseRecursion(list))
console.log(list)

function reverseLoop(list) {
    let elem = list
    let prev = null
    let newElem = null

    while (elem) {
        const { next } = elem

        newElem = {
            value: elem.value,
            next: prev
        }

        prev = newElem
        elem = next
    }

    return newElem
}

function reverseRecursion(elem = null, prev = null) {
    if (!elem) {
        return prev
    }

    const newElem = {
        value: elem.value,
        next: prev
    }

    return reverseRecursion(elem.next, newElem)
}
