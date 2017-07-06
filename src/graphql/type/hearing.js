/**
 * Created by Oleg Rusak on 02.07.2017.
 */

const _ = require('lodash')

const { factoryTypeBySchema, mapPropertiesToGraphQG } = require('../lib/map-schema-graphql')
const entityInterface = require('../interface/entity-interface')
const rootSchema = require('../schema/root-entity.json')
const schema = require('../schema/hearing.json')

const fieldsRoot = mapPropertiesToGraphQG(rootSchema.properties)
const fields = mapPropertiesToGraphQG(schema.properties)
const fieldUnion = _.assign(fields, fieldsRoot)

const entityType = factoryTypeBySchema(schema, fieldUnion, entityInterface)

module.exports = entityType
