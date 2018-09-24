/* global describe, it */
'use strict'

const test = require('ava');

const SubscribePromisify = require('../subscribe-promisify');

test.before(() => {

})
test.after(() => {

})

test('SubscribePromisify.mainHandler',  async (t) => {
    const supromise = new SubscribePromisify();
    
    const promise = supromise.register((yeah, nah, ...args) => {
        const [ message ] = args;

        return yeah(1);
    });

    const intervalId = setTimeout(supromise.handler, 1000, { type: 'UPDATED' });
    
    const result = await promise;
        
    t.true(result === 1);
});

test('SubscribePromisify.mainHandler default timeout',  async (t) => {
    const supromise = new SubscribePromisify();
    
    const promise = supromise.register((yeah, nah, ...args) => {
        //  never
        if (false) return yeah()
    });

    const intervalId = setTimeout(supromise.handler, 0, { type: 'UPDATED' });
        
    try {
        const result = await promise;
    } catch (error) {
        t.is(error.message, 'timeout error')
    }
});

test('SubscribePromisify.mainHandler custom timeout',  async (t) => {
    const supromise = new SubscribePromisify();
    
    const promise = supromise.register((yeah, nah, ...args) => {
        //  never
        if (false) return yeah()
    }, 100);

    const intervalId = setTimeout(supromise.handler, 0, { type: 'UPDATED' });
        
    try {
        const result = await promise;
    } catch (error) {
        t.is(error.message, 'timeout error')
    }
});
