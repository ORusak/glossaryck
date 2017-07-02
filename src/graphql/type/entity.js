/**
 * Created by Oleg Rusak on 02.07.2017.
 */

const mapSchemaGraphQL = require('../lib/map-schema-graphql')

const schemaRoot = require('../schema/root-entity.json')

module.exports = function getEntityField (schema, mapTypeCustom) {
  const fields = mapSchemaGraphQL.mapPropertiesToGraphQG(schemaRoot.properties)

  fields.data = mapSchemaGraphQL.mapPropertiesToGraphQG(schema.properties, mapTypeCustom)

  return fields
}
