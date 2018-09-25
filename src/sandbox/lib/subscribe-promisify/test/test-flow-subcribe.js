/**
 */
'use strict'

const test = require('ava');

const TestFlow = require('../test-flow');

test.before(() => {

})
test.after(() => {

})

test('TestFlow. subscribe to one event',  async (t) => {
    const flow = new TestFlow();
    
    const interval = setInterval(flow.handler, 1000, { type: 'UPDATED' });

    const result = await flow
        .subscribe((yeah, nah, ...args) => {
            const [ message ] = args;

            if (message.type === 'UPDATED') return yeah(1);
        })
        .valueOf();
        
    t.true(result === 1);

    clearInterval(interval);

    t.is(flow._pool._listeners.size, 0);
});

test('TestFlow. subscribe to two event',  async (t) => {
    const flow = new TestFlow();
    
    const messages = [{
        type: 'UPDATED'
    },{
        type: 'DELETED'
    }]

    let counter = 0;
    const interval = setInterval(() => {
        const message = messages[counter++]
        
        return flow.handler(message);
    }, 500);

    const result = await flow
        .subscribe((yeah, nah, ...args) => {
            const [ message ] = args;

            if (message.type === 'UPDATED') return yeah('updated');
        })
        .subscribe((yeah, nah, ...args) => {
            const [ message = {} ] = args;
            const { type } = message;
    
            if (type === 'DELETED') return yeah('deleted');
        })
        .valueOf();
        
    t.true(result === 'deleted');

    clearInterval(interval);

    t.is(flow._pool._listeners.size, 0);
});
