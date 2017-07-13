/**
 * Created by Oleg Rusak on 12.07.2017.
 */

const graphql = require('graphql')

const factoryGraphQLAPI = require('../lib/graphql')

const { query } = require('./judgement-fine/graphql')
const schema = new graphql.GraphQLSchema({ query })

module.exports = factoryGraphQLAPI(schema)
