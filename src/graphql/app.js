/**
 * Created by Oleg Rusak on 27.06.2017.
 */

const express = require('express')
const graphqlHTTP = require('express-graphql')
const graphql = require('graphql')
const typeQuery = require('./type-query/type-query')

const schema = new graphql.GraphQLSchema({ query: typeQuery })

// graphql.graphql(schema, `{ judgementFine(id: "1") { guid }}`)
//   .then((data) => {
//     console.log(data)
//   })

const app = express()

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

app.listen(4000, () => {
  console.log('Running a GraphQL API server at localhost:4000/graphql')
})
