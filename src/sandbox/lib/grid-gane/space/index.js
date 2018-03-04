'use strict'

const TransportVM = require('../transport/vm')

/**
 * Constrains:
 *  - no ping. check only when call func
 *  - natural call rpc func. Simple API.
 *  - not load service func after connect. When need dynamics load?
 *  
 * Requirements:
 *  - reg funcs as service object
 *  - remove object transport from options
 *  - add transport options to space options
 *  - split type func by namespace. first ver check local type call func.
 *  - 
 */

/**
 * @class Space 
 */
class Space {

    /**
     * 
     * @param {object} options 
     * @param {object} options.transport 
     */
    constructor (options) {
        this._transport = new TransportVM()

        this._funcServiceList = []
    }

    connect () {

    }

    disconnect () {

    }

    registerServiceFunc () {

    }

    /**
     * 
     * @param {string} name 
     * @param {object} [schema] We do not validate data invoke func.
     * RTA must support validate cache data when write to cache.
     * Client (RCT) must reg schema cache.
     */
    cache (name, schema) {

    }

    registerInvokeFunc () {
    }

    _reconnect () {

    }

    _loadFunc () {

    }
}

const options = {
    transport: {
        name: 'http',
        selfUrl: "",
        gridAppUrl: "",
        //  ?
        listenUrl: ""
    }
}
const space = new Space(options)

space.connect()
space.registerServiceFunc(ProcessService)

//  User
const userSchema = {
    "type": "object",
    "required": [],
    "properties": {
        "role": {
            "type": "string",
            "pattern": "^uuid[{\\d}+]$"
        },
        "name": {
            "type": "string",
        },
        "age": {
            "type": "number",
            "minValue": "0",
            "maxValue": "150",
        }
    },
}

const User = space.cache('user', userSchema)

//  check local type call func
User.registerServiceFunc(ProcessService)
User.registerInvokeFunc(UserInvokeService)
User.registerSubscribeFunc({})
User.registerResolveFunc(function () {})

//  Role
const roleSchema = {
    "type": "object",
    "required": [],
    "properties": {
        "isAdmin": {
            "type": "boolean"
        },
        "name": {
            "type": "string"
        },
    },
}

const Role = space.cache('role', roleSchema)

Role.registerServiceFunc(ProcessService)
Role.registerInvokeFunc(RoleInvokeService)

//  Sex
const sexSchema = {
    "type": "string",
    "enum": ["Male", "Female"]
}

const Sex = space.cache('sex', sexSchema)

Sex.set('uuid1', 'Male')
Sex.set('uuid2', 'Female')

User.subscribe(User)

User.set('usr1', {
    name: 'Oleg Rusak',
    age: 16
})
User.has('usr1')
User.get('usr1')
//  validate by schema without required. check type.
User.patch('usr1', {
    age: 36
})
User.delete('usr1')

const token = 'token1'

User.ivk.setToken('usr1', token)

Role.set('admin', {
    isAdmin: true,
    name: 'Administrator'
})

User.ivk.setAsAdmin('usr1')
User.ivk.isAdmin('usr1')

module.export = Space
