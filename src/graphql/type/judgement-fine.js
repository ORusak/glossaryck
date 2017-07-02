/**
 * Created by Oleg Rusak on 02.07.2017.
 */

const _ = require('lodash')
const graphql = require('graphql');

const mapSchemaGraphQL = require('../lib/map-schema-graphql')

/**
 * Реализуем через функциональный подход для производительности.
 *
 * Мы могли бы использовать ООП с выделением базового класса отвечающего за:
 *  - подмешивание корневых полей
 *  - предоставление приватных методов трансформации типов
 *  - метода трансформации всего документа в тип graphql
 *
 * В дочерних классах через getter можно переопределять поля с особыми типами или другими свойствами
 *
 * Подход ООП привлекателен за счет чистоты кода. Инкапсуляция логики в родительском классе, в дочерних только
 * переопределение полей.
 * Однако! ООП метод подрузомевает выделение памяти на создание экземпляров. Что в целом для задачи не требуется
 * так как на лицо обычная трансформация данных.
 *
 */
const getEntityField = require('entity')

const schema = require('../schema/judgement-fine.json')
const mapCustomField = {
  'hearing': (property) => {
    console.log('hearing custom..')

    return {
      type: mapSchemaGraphQL.mapTypeSchemaToGraphQL(property),
      description: property.description
    }
  }
}
const fields = getEntityField(schema, mapCustomField)

module.exports = mapSchemaGraphQL.mapSchemaToGraphQL(schema, fields)
