'use script'

const _ = require('lodash');

const DEFAULT_TIMEOUT = 2 * 1000;

class SubscribePromisify {

    constructor () {

        this._resolve = null;
        this._reject = null;
        this._promise = null;
        this._timeout = null;
        
        this.handler = this.handler.bind(this);
    }

    register (callback, timeout = DEFAULT_TIMEOUT) {
        this._callback = callback;

        const promise = this._promisify(timeout);

        this._promise = promise;

        return promise
            .then((result) => {
                clearTimeout(this._timeout);
                
                return result;
            })
            .catch((error) => {
                clearTimeout(this._timeout)

                return Promise.reject(error);
            });
    }

    _promisify (timeout) {

        return new Promise((yeah, nah) => {
            this._timeout = setTimeout(nah, timeout, new Error('timeout error'));

            this._resolve = yeah;
            this._reject = nah;
        });
    }

    handler (...args) {
        try {
            //  check state this._promise
            this._callback(this._resolve, this._reject, ...args);
        
            return null;
        } catch (error) {
            
            return this._reject(error);
        }
        
    }

    get promise () {

        return this._promise;
    }
}

module.exports = SubscribePromisify;
