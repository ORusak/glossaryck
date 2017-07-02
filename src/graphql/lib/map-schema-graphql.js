/**
 * Created by Oleg Rusak on 02.07.2017.
 */

const _ = require('lodash')
const graphql = require('graphql')

function mapSchemaToGraphQL (schema, fields) {

  return new graphql.GraphQLObjectType({
    name: _.camelCase(schema.id),
    fields,
    description: schema.description || schema.title
  })
}

function mapPropertiesToGraphQG (properties, mapField) {

  return _.reduce(properties, (result, property, key) => {
    const graphQLFieldOption = mapField[key] || {
      type: mapTypeSchemaToGraphQL(property),
      description: property.description
    }

    result[key] = graphQLFieldOption

    return result
  }, {})
}

//  обработка nullble и require свйоств https://stackoverflow.com/questions/41505995/getting-field-type-must-be-output-type-error-when-defining-a-graphql-schema
//  property так как нужны доп свойства для вычисления типа
function mapTypeSchemaToGraphQL (property) {
  let graphQLType = null

  switch (property.type) {
    case 'string':
      graphQLType = graphql.GraphQLString

      break
    case 'boolean':
      graphQLType = graphql.GraphQLBoolean

      break
    case 'integer':
      graphQLType = graphql.GraphQLInt

      break

    default:
      graphQLType = graphql.GraphQLString

      break
  }

  return graphQLType
}

module.exports = {
  mapSchemaToGraphQL,
  mapPropertiesToGraphQG,
  mapTypeSchemaToGraphQL
}
