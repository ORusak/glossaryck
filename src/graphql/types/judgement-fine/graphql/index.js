/**
 * Created by Oleg Rusak on 12.07.2017.
 */
'use strict'

const type = require('./type')
const queryConfig = require('./query-config')
const query = require('./query')

module.exports = {
  type,
  query,
  queryConfig,
  mutation: null
}
