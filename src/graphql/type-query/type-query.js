/**
 * Created by Oleg Rusak on 02.07.2017.
 */
'use strict'

const graphql = require('graphql')
const _ = require('lodash')

const db = require('../example/db')

const judgementFine = require('../types/judgement-fine/graphql/type')
const entityInterface = require('../interface/entity-interface')

module.exports = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: {
    judgementFine: {
      type: new graphql.GraphQLList(judgementFine),
      args: {
        id: { type: graphql.GraphQLID }
      },
      resolve: (a, { id }) => {

        return db.find({
          "document_type_guid_revision": "judgement_fine",
          guid: id
        })
      }
    },
    entity: {
      type: new graphql.GraphQLList(entityInterface),
      args: {
        id: { type: graphql.GraphQLID }
      },
      resolve: (a, { id }) => {
        const value = _.cloneDeep(_.filter(db, {
          guid: id
        }))

        return _.map(value, item => {
          const valueFlatten  = _.assign(item, item.data)

          Reflect.deleteProperty(valueFlatten, 'data')

          return valueFlatten
        })
      }
    }
  }
})
