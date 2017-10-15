'use strict'

const _ = require('lodash')

const date = (date) => date.toISOString()

const db = [
  {
    "guid": '1',
    "guid_revision": 1,
    "actual_range": "[2016-10-12T15:35:34.897+00:00,)",
    "description_revision": "judgement_fine1",
    "document_type_guid_revision": 'judgement_fine',
    "guid_parent": 1,
    "state": "ON_SIGNING",
    "data": {
      "assignee": 1,
      "penner": 1,
      "number": "12345",
      "executed_copy": [
        {
          "guid": 1
        }
      ],
      "soft_copy": [
        {
          "guid": 1
        }
      ],
      "date_create_original": "2017-01-21T22:49:30.000+03:00",
      "effective_date": date(new Date()),
      "state": "ON_SIGNING",
      "case_administrative_offence": "123",
      "title": "Generate me!",
      "is_archived": false,
      "is_deleted": false,
      "hearing": "2",
      "place": "place",
      "no_number": false,
      "source": "ADIIOS",
      "approvers": [
        {
          "id_employee": 1,
          "role": "SIGNER",
          "is_complete": true,
          "resolution": "laborum"
        },
        {
          "id_employee": 1,
          "role": "SIGNER",
          "is_complete": false,
          "resolution": "laborum"
        }
      ]
    }
  },
  {
    "guid": '2',
    "guid_revision": 1,
    "actual_range": "[2016-10-12T15:35:34.897+00:00,)",
    "description_revision": "hearing1",
    "document_type_guid_revision": 'hearing',
    "guid_parent": 1,
    "state": "ON_SIGNING",
    "data": {
      "assignee": 1,
      "penner": 1,
      "number": "11111",
      "executed_copy": [
        {
          "guid": 1
        }
      ],
      "soft_copy": [
        {
          "guid": 1
        }
      ],
      "date_create_original": "2017-01-21T22:49:30.000+03:00",
      "effective_date": date(new Date()),
      "state": "ON_SIGNING",
      "case_administrative_offence": "123",
      "title": "Generate me!",
      "is_archived": false,
      "is_deleted": false,
      "hearing": "123",
      "place": "place",
      "no_number": false,
      "source": "ADIIOS",
      "approvers": [
        {
          "id_employee": 1,
          "role": "SIGNER",
          "is_complete": true,
          "resolution": "laborum"
        },
        {
          "id_employee": 1,
          "role": "SIGNER",
          "is_complete": false,
          "resolution": "laborum"
        }
      ]
    }
  }
]

function normalizeEntity (data) {
  const dataInit = _.cloneDeep(data)
  const dataFlatten = _.assign(item, item.data)

  Reflect.deleteProperty(dataFlatten, 'data')

  return dataFlatten
}

module.exports = {
  //  todo: поключить data-loader
  get: id => {
    const data = _.filter(db, { guid: id })

    return normalizeEntity(data)
  },
  find: (filters) => {
    const data = _.cloneDeep(_.filter(db, filters))

    return _.map(data, item => {
      const valueFlatten = _.assign(item, item.data)
      
      Reflect.deleteProperty(valueFlatten, 'data')

      return valueFlatten
    })
  },
  update: () => {
    throw new Error('Update not implement')
  }
}
