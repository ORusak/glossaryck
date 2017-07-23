/**
 * Created by Oleg Rusak on 22.07.2017.
 */

const assert = require('assert')

const {
  httpStubFactory,
  summary,
  getPriceByCurrencyRate,
  isObject,
  reduceObject,
  mapObject,
  bind,
  clone
} = require('./utils')

const resourceData = {
  '/rate/to_dollars': {
    rubles: 0.06,
    euros: 1.2,
    dollars: 1,
    pounds: 1.1,
    yens: 0.2
  }
}

const httpStub = httpStubFactory(resourceData)

const selectedCart = [
  {price: 20},
  {price: 45},
  {price: 67},
  {price: 1305}
]

const totalCartPrice = {
  rubles: '23950.00',
  euros: '1197.50',
  dollars: '1437.00',
  pounds: '1306.36',
  yens: '7185.00'
}

const calculate = chain()
  .data(selectedCart)
  .reduce(summary, 0)
  .resource({ url: '/rate/to_dollars', cache: true })
  .map(getPriceByCurrencyRate)
  .result((total, data) => {
    assert.deepEqual(data, totalCartPrice)

    console.log('result', data)
  })

calculate()

function chain () {
  const operations = []
  let sourceProps = []

  /**
   * ...
   * Функция источник данных для цепочки
   *
   * @param value
   * @returns {function()}
   * @private
   */
  function _registrationValue (value) {
    const valueInit = clone(value)

    return () => {
      sourceProps.unshift(valueInit)

      return valueInit
    }
  }

  function _reduceValues (handler, initValue) {

    return function (collection) {
      let result = initValue
      const additonalProps = sourceProps.slice(1)
      const handlerInit = bind(null, handler, additonalProps)

      if(Array.isArray(collection)) {

        result = collection.reduce(handlerInit, initValue)
      }

      if (isObject(collection)) {

        result = reduceObject(collection, handlerInit, initValue)
      }

      return result
    }
  }

  function _mapValues (handler) {

    return function (collection) {
      const additionalProps = sourceProps.slice(1)
      const handlerInit = bind(null, handler, additionalProps)

      return mapObject(collection, handlerInit)
    }
  }

  function _httpGetRequest (options) {
    const { cache } = options
    let cacheValue

    return () => {
      if (cache && cacheValue) {
        sourceProps.unshift(cacheValue)

        return cacheValue
      }

      return httpStub(options)
        .then(data => {
          cacheValue = data

          sourceProps.unshift(cacheValue)

          return cacheValue
        })
    }
  }

  function _registrationHandler (handler) {

    return data => {
      const additonalProps = sourceProps.slice(1)
      const handlerInit = bind(null, handler, additonalProps)

      handlerInit(data)

      return data
    }
  }

  function _api () {
    sourceProps = []

    return operations.reduce((chain, operation, index) => {
        const chainExecute = chain
        .then(data => {
          console.log('[chain] Pre process operation', index, data)

          return data
        })
        .then(data => {
          return operation(data)
        })
        .then(data => {
          //  замена в стеке значений текущим значением трансформации
          sourceProps.splice(0, 1, data)

          return data
        })
        .then(data => {
          console.log('[chain] Post process operation', index, data)

          return data
        })

      return chainExecute
    },
      Promise.resolve({})
    )
  }

  _api.data = data => {
    operations.push(_registrationValue(data))

    return _api
  }

  _api.reduce = (handler, initValue) => {
    operations.push(_reduceValues(handler, initValue))

    return _api
  }

  _api.resource = options => {
    operations.push(_httpGetRequest(options))

    return _api
  }

  _api.map = handler => {
    operations.push(_mapValues(handler))

    return _api
  }

  _api.result = handler => {
    operations.push(_registrationHandler(handler))

    return _api
  }

  return Object.freeze(_api)
}
