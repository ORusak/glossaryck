/**
 * Created by Oleg Rusak on 23.07.2017.
 */

//  фабрика эмуляции http запроса к rest ресурсу
function httpStubFactory (data) {

  return function httpStub ({ url }) {

    return Promise.resolve(data[url])
  }
}

//  обработчики трансформаций
function summary (total, value) {

  return total + value.price
}

//  обработчики трансформаций
function getPriceByCurrencyRate (summaryCart, rate) {

  return convertByCurrencyRate(summaryCart, rate).toFixed(2)
}

//  обработчики трансформаций
function convertByCurrencyRate (summaryCart, rate) {

  return summaryCart / rate
}

//  lodash like helpers
function mapObject (obj, handler) {
  const objInit = obj || {}
  let result = {}

  Object.keys(obj).forEach(key => {
    const value = objInit[key]

    result[key] = handler(value, key)
  })

  return result
}

//  lodash like helpers
function isObject (value) {

  return Object.prototype.toString.call(value) === '[object Object]';
}

//  lodash like helpers
function reduceObject (obj, handler, initValue) {
  const objInit = obj || {}
  let result = initValue

  Object.keys(obj).forEach(key => {
    const value = objInit[key]

    result = handler(result, value, key)
  })

  return result
}

//  lodash like helpers
function reduceArray (arr, handler, initValue) {
  const arrInit = Array.isArray(arr) ? arr : []

  return arrInit.reduce(handler, initValue)
}

//  lodash like helpers
function bind (ctx, handler, args) {
  const argsInit = Array.isArray(args) ? args : []

  return function execBind () {
    const argsRuntime = [].slice.call(arguments)
    const argsFinal = argsInit.concat(argsRuntime)

    return handler.apply(ctx, argsFinal)
  }
}

//  lodash like helpers
function clone (value) {
  if (Array.isArray(value)) {

    return value.slice(0)
  }

  if (isObject(value)) {

    return mapObject(value, item => item, {})
  }

  return value
}

module.exports = {
  httpStubFactory,
  summary,
  getPriceByCurrencyRate,
  convertByCurrencyRate,
  mapObject,
  reduceObject,
  isObject,
  reduceArray,
  bind,
  clone
}
