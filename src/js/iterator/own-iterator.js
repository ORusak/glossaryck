/**
 * Created by My on 02.06.2017.
 */

const a = { a: 1, b: 2 }

a[Symbol.iterator] = function () {
    const b = Object.keys(a)
    let i = 0

    return {
        next () {

            return {
                value: a[b[i++]],
                done: i > b.length
            }
        }
    }
}

for (let i of a) {
    console.log(i)
}
