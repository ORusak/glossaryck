/**
 */
'use strict'

const test = require('ava');

const TestFlow = require('../test-flow');

test.before(() => {

})
test.after(() => {

})

test('TestFlow. standard promise api',  async (t) => {
    const flow = new TestFlow();
    
    const result = await flow
        .then(() => {

            return 1;
        })
        .then(result => Promise.resolve(result + 1))
        .valueOf();
    
    t.is(result, 2);

    t.is(flow._pool._listeners.size, 0);
});

test('TestFlow. then + subscribe',  async (t) => {
    const flow = new TestFlow();
    
    const interval = setInterval(flow.handler, 1000, { type: 'UPDATED' });

    const result = await flow
        .subscribe((yeah, nah, ...args) => {
            const [ message ] = args;

            if (message.type === 'UPDATED') return yeah(1);
        })
        .then(result => result + 1)
        .valueOf();
    
    t.is(result, 2);
    
    clearInterval(interval);

    t.is(flow._pool._listeners.size, 0);
});

test('TestFlow. then + action',  async (t) => {
    const flow = new TestFlow();
    
    const result = await flow
        .action(() => {
            const participant = {
                id: '1',
                displayName: 'Joe'
            }

            return participant
        })
        .then(({displayName}) => displayName)
        .valueOf();
        
    t.is(result, 'Joe');
    
    t.is(flow._pool._listeners.size, 0);
});

test('TestFlow. resume flow',  async (t) => {
    const flow = new TestFlow();
    
    const result1 = await flow
        .then(() => {
            const participant = {
                id: '1',
                displayName: 'Joe'
            }

            return participant
        })
        .valueOf();
    
    const result2 = await flow
        .then(() => {
            
            return result1.displayName;
        })
        .valueOf();
        
    t.is(result2, 'Joe');
    
    t.is(flow._pool._listeners.size, 0);
});
