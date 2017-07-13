/**
 * Created by Oleg Rusak on 02.07.2017.
 */

const graphql = require('graphql')

const queryConfig = require('./query-config')

module.exports = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: queryConfig
})
