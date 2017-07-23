/**
 * Created by Oleg Rusak on 22.07.2017.
 */

const assert = require('assert')

const MonadSequence = require("monad-sequence-promise")

const all = MonadSequence.operation.all
const one = MonadSequence.operation.one

const {
  httpStubFactory,
  summary,
  getPriceByCurrencyRate,
  mapObject,
  reduceArray
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
const options = { url: '/rate/to_dollars'}

const monad = MonadSequence([
  //  todo: monad.operation.reduce
  // one('selectedCart', selectedCart),
  all({
    'summaryCart': getSummaryCart,
    'rateToDollar': getRateToDollar,
  }),
  //  todo: monad.operation.map
  one('summaryPriceByCurrency', getSummaryCartByCurrencyRate),
  all({
    "isEqual": function (summaryPriceByCurrency) {
      assert.deepEqual(summaryPriceByCurrency, totalCartPrice)

      return true
    },
    "log": function (summaryPriceByCurrency) {
      console.log('result', summaryPriceByCurrency)

      return null
    }
  })
], {
  id: "mainMonad"
})

//  точка переиспользования при изменениии состояния корзины
monad.execute({
  handlerError: handlerError,
}, { selectedCart })

function getRateToDollar () {

  return httpStub(options)
}

function getSummaryCart (selectedCart) {

  return reduceArray(selectedCart, summary, 0)
}

function getSummaryCartByCurrencyRate (rateToDollar, summaryCart) {
  const getSummaryCartByCurrencyRate = getPriceByCurrencyRate.bind(null, summaryCart)

  return mapObject(rateToDollar, getSummaryCartByCurrencyRate)
}

function handlerError (error) {

  console.log(error)
}
