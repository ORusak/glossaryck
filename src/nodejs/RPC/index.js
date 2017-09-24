/*
*
*/

'use strict'

const net = require('net')
const znode = require('znode')
const promisify = require('util').promisify

const port = 1333
const sockets = []

const RPC = {
    /* basic method support */
    ping: () => 'pong',
    /* async methods work identicaly to sync methods */
    ping2: () => 'pong2',
    /* supports binary types */
    pingBuffer: () => Buffer.from('pong'),
    /* you can also add static properties */
    API: 'v1'
}

const createServer = rpc => {
    let server = net.createServer(socket => {
        znode(socket, rpc)
    })
    return server
}
const createClient = async (port, rpc) => {
    let socket = net.connect(port)
    sockets.push(socket)
    return znode(socket, rpc)
}
const listen = (server) => {
    return promisify((port, cb) => server.listen(port, cb))
}

async function connect () {
    let rpc = {ping: () => 'pong'}
    let server = createServer(rpc)
    
    await listen(server)(1234)
    
    let remote = await createClient(1234, {pong: () => 'ping'})
    
    const result = await remote.ping()
    
    console.log(result);
}

connect()

// const server = net.createServer(socket => {
//         console.log(1)
//
//         return znode(socket, RPC)
//             .then(remote => {
//
//                 return remote.createConcat('pre-')
//             })
//             .then(concater => {
//
//                 return concater.concat('post')
//             })
//             .then(result => {
//                 console.log(result) // priv-pre-post
//             })
//             .catch(error => console.error.bind(console))
//     })
//
// server.listen(() => {
//
//         const dynamicRPC = {
//             createConcat: str => {
//                 let _private = 'priv-'
//                 return {concat: _str => _private + str + str}
//             }
//         }
//
//         let socket = net.connect(port)
//
//         return znode(socket, dynamicRPC)
//             .then(remote => {
//                 // console.log(await remote.ping()) // pong
//                 // console.log(await remote.ping2()) // pong2
//                 // console.log(await remote.pingBuffer()) // <Buffer 70 6f 6e 67>
//                 console.log(remote.API) // v1
//             })
//             .catch(error => console.error.bind(console))
//     })

