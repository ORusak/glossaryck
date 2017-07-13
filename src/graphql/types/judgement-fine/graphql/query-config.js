/**
 * Created by Oleg Rusak on 02.07.2017.
 */

const graphql = require('graphql')

const judgementFine = require('type')
const crud = require('../crud')

module.exports = {
  judgementFine: {
    type: new graphql.GraphQLList(judgementFine),
    args: {
      id: { type: graphql.GraphQLID }
    },
    resolve: (a, { id }) => {

      return crud.find({ guid: id })
    }
  }
}
