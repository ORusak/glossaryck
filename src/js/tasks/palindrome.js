/**
 * Created by Oleg Rusak on 18.07.2017.
 *
 * Задача с выявлении среди строк палиндромов. Одинаковых при прочтении с начала или с конца.
 */

const assert = require('assert')

/*
* Производительный
* */
function isPalindrome1 (str) {
  let i = 0
  let j = str.length - 1

  for (; i < j; i++, j--) {
    if (str[i] === str[j]) {
      continue
    }

    return false
  }

  return true
}

/*
* Короткий и декларативный
* */
function isPalindrome2 (str) {
  let strReverse = str.split('').reverse().join('') /*?*/

  return str === strReverse
}

const value1 = 'анна'
const value2 = 'оно'
const value3 = 'окно'

assert.ok(isPalindrome1(value1) === true)
assert.ok(isPalindrome1(value2) === true)
assert.ok(isPalindrome1(value3) === false)

assert.ok(isPalindrome2(value1) === true)
assert.ok(isPalindrome2(value2) === true)
assert.ok(isPalindrome2(value3) === false)
