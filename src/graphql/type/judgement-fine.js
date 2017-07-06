/**
 * Created by Oleg Rusak on 02.07.2017.
 */

const _ = require('lodash')

const { factoryTypeBySchema, mapPropertiesToGraphQG } = require('../lib/map-schema-graphql')
const entityInterface = require('../interface/entity-interface')
const rootSchema = require('../schema/root-entity.json')
const schema = require('../schema/judgement-fine.json')

//  type
const HearingType = require('./hearing')

const mapCustomField = {
  'hearing': (property) => {
    console.log('hearing custom..')

    return {
      type: HearingType,
      description: property.description
    }
  }
}

const fieldsRoot = mapPropertiesToGraphQG(rootSchema.properties)
const fields = mapPropertiesToGraphQG(schema.properties, mapCustomField)
const fieldUnion = _.assign(fields, fieldsRoot)

const entityType = factoryTypeBySchema(schema, fieldUnion, entityInterface, mapCustomField)

module.exports = entityType
