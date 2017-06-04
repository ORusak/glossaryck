/**
 * Created by My on 27.05.2017.
 *
 * Концепция от Дугласа Крокфорда (https://habrahabr.ru/company/jugru/blog/327320/), что использование this
 * снижает безопасность использования кода, так как вызов метода как функции привязывает к глобальному контексту.
 * Как решение, использование хранение данных в замыкании. Экземпляр класса формировать через фабричную функцию.
 */

const assert = require("assert")

//  Вариант обычный с контекстом
class WithThis {
    constructor (type) {
        this.type = type || ""
    }

    prepareModel () {
        //  Опасно! Привызове метода как фукнции this === global context
        const dataDefault = this.prepareDefault()

        const dataRequire = this.prepareRequire()

        return Object.assign(dataDefault, dataRequire)
    }

    prepareDefault () {

        return {}
    }

    prepareRequire () {
        const { type } = this
        return { type }
    }
}

//  Без this
//  Родительская фабрика
function factoryNoThisParent (options) {
    const { type, id } = options
    const parentMethod = {
        prepareDefault () {

            return {}
        },

        prepareRequire (type, date) {

            return { type, date: date.toISOString() }
        },

        prepareModel (id, type, date) {
            const dataDefault = method.prepareDefault(id)

            const dataRequire = method.prepareRequire(type, date)

            return Object.assign(dataDefault, dataRequire)
        }
    }
    const method = Object.assign(parentMethod, options)

    function run (date) {

        return method.prepareModel(id, type, date)
    }

    return Object.freeze({
        run
    })
}

//  Наследование
//  Часть методов переопределяем в дочернем "классе"
function factoryNoThisChild (options) {
    const parent = factoryNoThisParent(Object.assign({ prepareDefault }, options))

    function prepareDefault (id) {

        return { id }
    }

    return parent
}

//  run
const withThis = new WithThis("type1")
const noThis1 = factoryNoThisParent({
    type: "type2"
})
const noThis2 = factoryNoThisChild({
    type: "type3",
    id: 3
})
const noThis3 = factoryNoThisChild({
    type: "type5",
    id: 5,
    prepareDefault: function (id) {

        return { id: id + 100 }
    }
})

//  test
const result = noThis1.run(new Date("2017.01.11"))
assert.deepEqual(result, { type: "type2", date: "2017-01-10T21:00:00.000Z" })

const date1 = new Date()
assert.deepEqual(noThis2.run(new Date()), { type: "type3", date: date1.toISOString(), id: 3 })

const date2 = new Date()
assert.deepEqual( noThis3.run(new Date()), { type: "type5", date: date2.toISOString(), id: 105 })

assert.deepEqual(withThis.prepareModel(), { type: "type1"})
