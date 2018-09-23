/* global describe, it */
'use strict'

const test = require('ava');

const SubcribePromisify = require('../subscribe-promisify');

test.before(() => {

})
test.after(() => {

})

test('SubscribePromisify.mainHandler',  async (t) => {
    const supromise = new SubcribePromisify();
    
    const promise = supromise.register((yeah, nah, ...args) => {
        console.log(...args);
        const [ message ] = args;

        console.log(message);
        
        return yeah(1);
    });

    const intervalId = setTimeout(supromise.handler, 1000, { type: 'UPDATED' });
    // const intervalId = setInterval((...args) => {
    //     console.log(args);

    //     clearInterval(intervalId);
    //     t.end();
    // }, 1000, { type: 'UPDATED' });
    
    const result = await promise;
        
    t.true(result === 1);
});

test('SubscribePromisify.mainHandler timeout',  async (t) => {
    const supromise = new SubcribePromisify();
    
    const promise = supromise.register((yeah, nah, ...args) => {
        if (false) return yeah()
    });

    const intervalId = setTimeout(supromise.handler, 0, { type: 'UPDATED' });
    // const intervalId = setInterval((...args) => {
    //     console.log(args);

    //     clearInterval(intervalId);
    //     t.end();
    // }, 1000, { type: 'UPDATED' });
    
    try {
        const result = await promise;
    } catch (error) {
        t.is(error.message, 'timeout error')
    }
});
