/* global describe, it */
/**
 * TODO:
 *  [x] add timeout
 *  - change in handler yeah, nah -> return value, throw error, return undefined - skip
 */
'use strict'

const test = require('ava');

const SubcribePool = require('../subscribe-pool');

test.before(() => {

})
test.after(() => {

})

test('SubcribePool.handler success run handler with result',  async (t) => {
    const pool = new SubcribePool();
    
    const promise = pool.add((yeah, nah, ...args) => {
        const [ message ] = args;

        if (message.type === 'UPDATED') return yeah(1);
    });
    
    const interval = setInterval(pool.handler, 1000, { type: 'UPDATED' });
    
    const result = await promise;
        
    t.true(result === 1);

    clearInterval(interval);

    t.is(pool._listeners.size, 0);
});

test('SubcribePool.handler success run handler with error',  async (t) => {
    const pool = new SubcribePool();
    const TYPES = ['UPDATED'];
    const promise = pool.add((yeah, nah, ...args) => {
        const [ message ] = args;

        if (TYPES.includes(message.type)) return yeah();

        return nah(new Error('not support type'));
    });
    
    const interval = setInterval(pool.handler, 1000, { type: undefined });
    
    try {
        const result = await promise;
    } catch (error) {
        t.is(error.message, 'not support type');
    }

    clearInterval(interval);

    t.is(pool._listeners.size, 0);
});

test('SubcribePool.handler success run handler with error',  async (t) => {
    const pool = new SubcribePool();
    const messages = []

    const updatedEntity = (yeah, nah, ...args) => {
        const [ message = {} ] = args;
        const { type } = message;

        if (type === 'UPDATED') return yeah();
    }
    
    const deletedEntity = (yeah, nah, ...args) => {
        const [ message = {} ] = args;
        const { type } = message;

        if (type === 'DELETED') return yeah();
    }

    pool.add(updatedEntity);
    pool.add(deletedEntity);
    
    let counter = 0;
    const interval = setInterval(() => {
        const message = messages[counter++]
        
        return pool.handler(message);
    }, 500);
    
    try {
        messages.push({
            type: 'UPDATED'
        });
        await pool.get(updatedEntity);
        messages.push({
            type: 'DELETED'
        });
        await pool.get(deletedEntity);
    } catch (error) {
        t.falsy(error);
    }

    clearInterval(interval);

    t.is(pool._listeners.size, 0);
});

test('SubcribePool.handler success run handler with error',  async (t) => {
    const pool = new SubcribePool();
    const messages = [{
        type: 'UPDATED'
    }, {
        type: undefined
    }]

    const updatedEntity = (yeah, nah, ...args) => {
        const [ message = {} ] = args;
        const { type } = message;

        if (type === 'UPDATED') return yeah();
    }
    
    const deletedEntity = (yeah, nah, ...args) => {
        const [ message = {} ] = args;
        const { type } = message;

        if (type === 'DELETED') return yeah();
    }

    pool.add(updatedEntity);
    pool.add(deletedEntity, 1000);
    
    let counter = 0;
    const interval = setInterval(() => {
        const message = messages[counter++]
        
        return pool.handler(message);
    }, 500);
    
    try {
        await pool.get(updatedEntity);
    } catch (error) {
        t.falsy(error);
    }
    try {
        await pool.get(deletedEntity);
    } catch (error) {
        t.is(error.message, 'timeout error');
    }

    clearInterval(interval);

    t.is(pool._listeners.size, 0);
});
