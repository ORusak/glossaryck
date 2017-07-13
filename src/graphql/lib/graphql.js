/**
 * Created by Oleg Rusak on 13.07.2017.
 */

const graphql = require('graphql')

module.exports = function factoryGraphQLAPI (schema) {

  return {
    query: query => {
      return graphql.graphql(schema, `query ${query}`)
    },
    mutation: (query) => {
      return graphql.graphql(schema, `mutation ${query}`)
    }
  }
}
