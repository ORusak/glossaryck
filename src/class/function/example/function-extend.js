/**
 * Created by My on 02.06.2017.
 *
 * Наследовнаие от Function
 */

function X () {
    var that = this

    var n = function (v) {
        that.a = v
    }

    n.__proto__ = this

    return n
}

X.prototype = Object.create(Function.prototype)
X.prototype.constructor = X

//  Можно расширять своими методами
X.prototype.c = function c () {
    console.log(this.a)
}

var y = new X()

y(123)
y.c()

//  Доступны методы Function
console.log(typeof y.bind);
console.log(typeof y.apply);
