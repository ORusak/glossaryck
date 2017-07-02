const date = (date) => date.toISOString()

module.exports = [
  {
    "guid": 1,
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
