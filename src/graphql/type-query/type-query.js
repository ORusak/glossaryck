/**
 * Created by Oleg Rusak on 02.07.2017.
 */

const graphql = require('graphql')
const _ = require('lodash')

const db = require('../db')

const judgementFine = require('../type/judgement-fine')

module.exports = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: {
    judgementFine: {
      type: judgementFine,
      args: {
        id: { type: graphql.GraphQLString }
      },
      resolve: (a, { id }) => {

        return _.filter(db, {
          "document_type_guid_revision": "judgement_fine",
          guid: id
        })
      }
    }
  }
})
