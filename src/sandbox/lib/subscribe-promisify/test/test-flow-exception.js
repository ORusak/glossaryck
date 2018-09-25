/**
 */
'use strict'

const test = require('ava');

const TestFlow = require('../test-flow');

test.before(() => {

})
test.after(() => {

})

test('TestFlow. catch async/await exception',  async (t) => {
    const flow = new TestFlow();
    
    const interval = setInterval(flow.handler, 1000, { type: 'UPDATED' });

    try {
        const result = await flow
            .subscribe((yeah, nah, ...args) => {
                const [ message ] = args;

                throw new Error('boom!')

                if (message.type === 'UPDATED') return yeah(1);
            })
            .valueOf();
    } catch (error) {
        t.is(error.message, 'boom!');
    }
    
    clearInterval(interval);

    t.is(flow._pool._listeners.size, 0);
});

test('TestFlow. handle exception in block catch',  async (t) => {
    const flow = new TestFlow();
    
    const interval = setInterval(flow.handler, 1000, { type: 'UPDATED' });

    const result = await flow
        .subscribe((yeah, nah, ...args) => {
            const [ message ] = args;

            throw new Error('boom!')

            if (message.type === 'UPDATED') return yeah(1);
        })
        .catch((error) => {
            t.is(error.message, 'boom!');

            return null;
        })
        .valueOf();
    
    t.is(result, null)

    clearInterval(interval);

    t.is(flow._pool._listeners.size, 0);
});
