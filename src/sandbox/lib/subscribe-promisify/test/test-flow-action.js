/**
 */
'use strict'

const test = require('ava');

const TestFlow = require('../test-flow');

test.before(() => {

})
test.after(() => {

})

test('TestFlow. use sync action',  async (t) => {
    const flow = new TestFlow();

    const result = await flow
        .action(() => 1)
        .valueOf();
        
    t.is(result, 1);
});

test('TestFlow. use async action',  async (t) => {
    const flow = new TestFlow();
    const result = await flow
        .action(() => {

            return Promise.resolve(1);
        })
        .valueOf();
        
    t.is(result, 1);
});

test('TestFlow. use two action',  async (t) => {
    const flow = new TestFlow();
    const result = await flow
        .action(() => {

            return 1;
        })
        .action((result) => {

            return Promise.resolve(result + 1);
        })
        .valueOf();
        
    t.is(result, 2);
});
