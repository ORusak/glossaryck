/**
 * Created by Oleg Rusak on 02.07.2017.
 */

const graphql = require('graphql')

const mapSchemaGraphQL = require('../../lib/map-schema-graphql')

const schemaRoot = require('./root-entity.json')

module.exports = function getEntityField (schema, mapTypeCustom) {
  const fields = mapSchemaGraphQL.mapPropertiesToGraphQG(schemaRoot.properties)

  fields.data = {
    type: new graphql.GraphQLObjectType({
      name: 'data',
      fields: mapSchemaGraphQL.mapPropertiesToGraphQG(schema.properties, mapTypeCustom)
    })
  }

  return fields
}
