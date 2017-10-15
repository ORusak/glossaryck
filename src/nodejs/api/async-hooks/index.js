/*
*
*/

'use strict'

const fs = require('fs');
const util = require('util');

function debug(...args) {
    // use a function like this one when debugging inside an AsyncHooks callback
    fs.writeSync(1, `${util.format(...args)}\n`);
}

const asyncHooks = require('async_hooks')

const eid = asyncHooks.executionAsyncId()

console.log(eid);

const tid = asyncHooks.triggerAsyncId()

console.log(tid);
