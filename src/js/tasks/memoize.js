/*
* Задача кеширования результата при одинаковых входных аргументов
*
* Такая возможность присуща чистым функциям из функционального программирования
* */

//  todo: Переработать на функцию кеширования любых чистых функций
//  const mFunc = memoize(pureFunction)
//  mFunc(a, b)

//  используем Map так как ключи могут быть разными значениями
const cache = new Map()

function memoize (a, b) {
  //  сам объект ключом быть не может, сравниваются ссылки
  const key = a.v
  let value

  if (cache.has(key)) {
    console.log('from cache')

    value = cache.get(key)
  } else {
    value = a.v + b

    cache.set(key, value)
  }

  return cache.get(key)
}

console.log(memoize({ v : 1 }, 2))

console.log(memoize({ v : 1 }, 2))
