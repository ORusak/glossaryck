'use strict'

const net = require('net')
const http = require('http')
const znode = require('znode')
const promisify = require('util').promisify

const port = 1234

const RPC = {
    /* basic method support */
    ping: () => 'pong',
    /* async methods work identicaly to sync methods */
    ping2: async () => 'pong2',
    /* supports binary types */
    pingBuffer: () => Buffer.from('pong'),
    /* you can also add static properties */
    API: 'v1'
}



const listen = (server) => {
    return promisify((port, cb) => server.listen(port, cb))
}

async function connect () {
    let server = await net.createServer(async socket => {
        
        const remote = await znode(socket, RPC)
        
        const concater = await remote.createConcat('bbb')
        const result = await concater.concat('ddd')
    
        console.log(result);
    })
    
    await listen(server)(1234)
    
    const dynamicRPC = {
        createConcat: str => {
            let _private = 'priv-'
            return {concat: _str => _private + str + _str}
        }
    }
    
    let socket = net.connect(port)
    let remote = await znode(socket, dynamicRPC)
    
    console.log(await remote.ping()) // pong
    console.log(await remote.ping2()) // pong2
    console.log(await remote.pingBuffer()) // <Buffer 70 6f 6e 67>
    console.log(remote.API) // v1
}

connect()

const ser = http.createServer((request, response) => {

})

ser.listen(1111, () => {
    console.log('live!')
})
