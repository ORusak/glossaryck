/**
 * Created by Oleg Rusak on 02.07.2017.
 */

const _ = require('lodash')

const { factoryTypeBySchema, mapPropertiesToGraphQG } = require('../../../lib/map-schema-graphql')
const entityInterface = require('../../../interface/entity-interface')
const rootSchema = require('../../entity/root-entity.json')
const schema = require('./judgement-fine.json')

const crud = require('../crud')
//  todo: require by absolute path as module
const crudHearing = require('../../hearing/crud')

//  types
const HearingType = require('../../hearing/hearing')

const mapCustomField = {
  'hearing': (property) => {
    console.log('hearing custom..')

    return {
      type: HearingType,
      description: property.description,
      resolve(source, args, context, parent) {

        return crudHearing.get(source['hearing'])
      }
    }
  }
}

const fieldsRoot = mapPropertiesToGraphQG(rootSchema.properties)
const fields = mapPropertiesToGraphQG(schema.properties, mapCustomField)
const fieldUnion = _.assign(fields, fieldsRoot)

const entityType = factoryTypeBySchema(schema, fieldUnion, entityInterface, mapCustomField)

module.exports = entityType
