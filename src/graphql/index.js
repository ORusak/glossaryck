/**
 * Created by Oleg Rusak on 27.06.2017.
 */

const graphql = require('graphql')
const typeQuery = require('./type-query/type-query')

const schema = new graphql.GraphQLSchema({ query: typeQuery })

graphql.graphql(schema, `{ judgementFine(id: "1") { guid }}`)
  .then(console.log)
