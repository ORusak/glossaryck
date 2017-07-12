/**
 * Created by Oleg Rusak on 02.07.2017.
 */

const _ = require('lodash')
const graphql = require('graphql')

const { factoryTypeBySchema, mapPropertiesToGraphQG } = require('../../lib/map-schema-graphql')
const entityInterface = require('../../interface/entity-interface')
const rootSchema = require('../../schema/root-entity.json')
const schema = require('../../schema/judgement-fine.json')
const db = require('../../example/db')

//  types
const HearingType = require('../hearing')

const mapCustomField = {
  'hearing': (property) => {
    console.log('hearing custom..')


    return {
      type: HearingType,
      description: property.description,
      resolve(source, args, context, parent) {

        const data = _.cloneDeep(_.filter(db, {
          "document_type_guid_revision": "hearing",
          guid: source['hearing']
        }))

        return _.first(_.map(data, item => {
          const valueFlatten = _.assign(item, item.data)
          Reflect.deleteProperty(valueFlatten, 'data')

          return valueFlatten
        }))
      }
    }
  }
}

const fieldsRoot = mapPropertiesToGraphQG(rootSchema.properties)
const fields = mapPropertiesToGraphQG(schema.properties, mapCustomField)
const fieldUnion = _.assign(fields, fieldsRoot)

const entityType = factoryTypeBySchema(schema, fieldUnion, entityInterface, mapCustomField)

module.exports = entityType
