/**
 * Created by Oleg Rusak on 22.07.2017.
 */

const assert = require('assert')

const {
  httpStubFactory,
  summary,
  getPriceByCurrencyRate,
  mapObject
} = require('./utils')

//  эмуляция ресурса с данными
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

const summaryCart = selectedCart.reduce(summary, 0)
const getSummaryCartByCurrencyRate = getPriceByCurrencyRate.bind(null, summaryCart)

//  конечный результат
const totalCartPrice = {
  rubles: '23950.00',
  euros: '1197.50',
  dollars: '1437.00',
  pounds: '1306.36',
  yens: '7185.00'
}

const options = { url: '/rate/to_dollars'}

httpMonad(options, getSummaryPriceByCurrency)
  .then(data => {
    assert.deepEqual(data, totalCartPrice)

    console.log('result', data)
  })
  .catch(handlerError)

/**
 *
 * @param {object} options настройки доступа к rest api
 * @param {function} resolve обработчик результата
 *
 * @returns {Promise.<object>} -
 */
function httpMonad (options, resolve) {

  return httpStub(options)
    .then(resolve)
    .catch(error => {
      console.log('[asyncMonad] error', error)

      return error
    })
}

/**
 * Обрабочик. Трансформация курсов валют в сумму в конкретной валюте
 *
 * @param rateToDollar
 * @returns {*}
 */
function getSummaryPriceByCurrency (rateToDollar) {

  return mapObject(rateToDollar, getSummaryCartByCurrencyRate)
}

function handlerError (error) {

  console.log(error)
}
