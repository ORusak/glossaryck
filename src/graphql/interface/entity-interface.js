/**
 * Created by Oleg Rusak on 06.07.2017.
 */

const graphql = require('graphql')

const { mapPropertiesToGraphQG } = require('../lib/map-schema-graphql')
const schemaRoot = require('../schema/root-entity.json')

const fields = mapPropertiesToGraphQG(schemaRoot.properties)

//  type

module.exports = new graphql.GraphQLInterfaceType({
  name: "Entity",
  fields,
  description: 'Базовый интерфейс сущностей'
})
