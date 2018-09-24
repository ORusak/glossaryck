'use script'

const _ = require('lodash');

const SubscribePromisify = require('./subscribe-promisify');

class SubscribePool {

    constructor () {

        this._listeners = new Map();

        this.handler = this.handler.bind(this);
    }

    handler (...args) {
        const subscribeInfos = this._listeners.values();

        // цикл по ключам
        for(let info of subscribeInfos) {
            const { supromise } = info;
            const { handler } = supromise;
            try {
                handler(...args);
            } catch (error) {
                console.error(error);
            }
        }
    }

    add (listener, timeout) {
        listener
        const supromise = new SubscribePromisify();
        const promise = supromise.register(listener, timeout)
            .then((result) => {
                result
                this._listeners.delete(listener);

                return result;
            })
            .catch((error) => {
                this._listeners.delete(listener);

                return Promise.reject(error);
            });
        
        this._listeners.set(listener, {supromise, promise});

        return promise
    }

    get (listener) {
        const { promise } = this._listeners.get(listener);

        return promise;
    }
}

module.exports = SubscribePool;
