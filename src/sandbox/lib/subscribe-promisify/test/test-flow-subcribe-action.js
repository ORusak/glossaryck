/**
 */
'use strict'

const test = require('ava');

const TestFlow = require('../test-flow');

test.before(() => {

})
test.after(() => {

})

test('TestFlow. flow with actions and subscribes',  async (t) => {
    const flow = new TestFlow();
    
    const messages = []

    let counter = 0;
    const interval = setInterval(() => {
        const message = messages[counter++]
        
        return flow.handler(message);
    }, 500);

    const result = await flow
        .action(() => {
            messages.push({
                type: 'UPDATED'
            });
        })
        .subscribe((yeah, nah, ...args) => {
            const [ message ] = args;

            if (message.type === 'UPDATED') return yeah('updated');
        })
        .action(() => {
            messages.push({
                type: 'DELETED'
            });
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

test('TestFlow. flow with another order actions and subscribes',  async (t) => {
    const flow = new TestFlow();
    
    const messages = [{
        type: 'UPDATED'
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
        .action((result) => {
            if (result === 'updated') {
                messages.push({
                    type: 'DELETED'
                });
            }
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
