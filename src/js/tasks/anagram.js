/**
 * Created by Oleg Rusak on 18.07.2017.
 *
 * Функция, принимающая массив произвольных слов и на выходе дающую двумерный массив анаграмм
 */

const assert = require('assert')

/*
* */
function getAnagram1 (list) {
  const cache = {}

  return list.reduce((result, word) => {
    const normilize = word.split('').sort().join('')
    const index = typeof cache[normilize] === 'undefined' ? result.push([]) - 1 : cache[normilize]

    result[index].push(word)
    cache[normilize] = index

    return result
  }, [])
}

const value = ['стол', 'барокко', 'слот', 'кот', 'кошка', 'ток', 'коробка', 'лотс']

assert.deepEqual(getAnagram1(value), [
  ['стол', 'слот', 'лотс'],
  ['барокко', 'коробка'],
  ['кот', 'ток'],
  ['кошка']
])
