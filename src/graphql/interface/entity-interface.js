/**
 * Created by Oleg Rusak on 06.07.2017.
 */

'use strict'

const graphql = require('graphql')

const { mapPropertiesToGraphQG } = require('../lib/map-schema-graphql')
const schemaRoot = require('../types/entity/root-entity.json')

const fields = mapPropertiesToGraphQG(schemaRoot.properties)

//  types

module.exports = new graphql.GraphQLInterfaceType({
  name: "Entity",
  fields,
  description: 'Базовый интерфейс сущностей'
})
