/**
 * todo:
 *      [x] add promise api
 *      [x] add handle exceptions
 *      [] add action timeout
 *      [] pass prev value to subscribe
 */
'use script'

const _ = require('lodash');

const SubscribePool = require('./subscribe-pool');

class TestFlow {

    constructor () {

        this._pool = new SubscribePool();
        //  todo: remove if unused
        //  if need add clear list
        this._subscribes = [];
        this._promiseFlow = Promise.resolve();

        this.handler = this.handler.bind(this);
    }

    handler (...args) {

        return this._pool.handler(...args);
    }

    action (callback) {
        this._promiseFlow = this._promiseFlow
            .then(callback);

        return this
    }

    subscribe (callback, timeout) {
        const promise = this._pool.add(callback, timeout);

        this._subscribes.push(promise);

        this._promiseFlow = this._promiseFlow
            .then(() => promise);

        return this;
    }

    valueOf () {

        return this._promiseFlow;
    }

    catch (callback) {

        this._promiseFlow = this._promiseFlow
            .catch(callback);

        return this
    }

    then (callback) {

        this._promiseFlow = this._promiseFlow
            .then(callback);

        return this
    }
}

module.exports = TestFlow;
