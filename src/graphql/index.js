/**
 * Created by Oleg Rusak on 27.06.2017.
 */

const { graphql, buildSchema } = require('graphql')

const schema = buildSchema(`
  type Query {
    hello: String
  }
`)

const root = {
  hello: () => {

    return 'WorHel'
  }
}

graphql(schema, '{ hello }', root)
  .then(console.log)
