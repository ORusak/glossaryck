'use strict'

const assert = require('assert')

const controller = require('./example1')
const ifaceFactory = require('./iface')
const log = require('./log')

const httpMoc = {
    execute () {
        return Promise.resolve({ id: 1, name: 'pavel' })
    }
}

const iface = ifaceFactory({ http: httpMoc })

const options = {
    param: {
        user: {
            id: 1,
            name: 'oleg'
        }
    }
}
const ctx = {
    requestId: '1',
}

controller(ctx, options, { iface, log })
.then(result => {

    assert.ok(result.id === 1)
})
