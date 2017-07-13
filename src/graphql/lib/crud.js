/**
 * Created by Oleg Rusak on 13.07.2017.
 */

const db = require('../example/db')

module.exports = function factoryCRUD (type) {

  return {
    get: id => {
      const data = db.get(id)

      if (data.document_type_guid_revision !== type) {
        throw new Error('404')
      }

      return data
    },
    find: (filters) => {
      _.set(filters, 'document_type_guid_revision', type)

      return db.find(filters)
    },
    update: () => {

      return db.update()
    }
  }
}
