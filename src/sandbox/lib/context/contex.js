'use strict';

//  lib
const _ = require('lodash');

const CACHE_MODULE_PREFIX = 'module';
const CACHE_INTERFACE_PREFIX = 'interface';
const CACHE_CLASS_PREFIX = 'class';

const LIST_PREFIX = [ CACHE_CLASS_PREFIX, CACHE_INTERFACE_PREFIX, CACHE_MODULE_PREFIX ];

/**
 * @class Queue
 */
class Context {

    /**
     * 
     * @constructor
     * 
     * @param {object} [options = {}] -
     * @param {string} [options.parent] parent context
     */
    constructor (options = {}) {

        this._parent = options.parent || null;
        this._cache = {};
    }

    /**
     * 
     * @param {*} path 
     * @param {*} value 
     * 
     * @exception {Error} [Context] Expected undefined value
     * @exception {Error} [Context] Key ${path} already bind. Use ctx.rebind instead.
     */
    bind (path, value) {
        if (_.isUndefined(value)) {
            throw new Error(`[Context] Expected not undefined value for bind key '${path}'`);
        }
        
        const oldValue = _.get(this._cache, path);
        if (oldValue) {
            throw new Error(`[Context] Key ${path} already bind`);
        }

        _.set(this._cache, path, value);

        return null;
    }
    
    /**
     * 
     * @param {*} name 
     * @param {*} moduleInstance 
     */
    module (name, moduleInstance) {
        if (_.isUndefined(moduleInstance)) return this.get(`${CACHE_MODULE_PREFIX}.${name}`);

        return this.bind(`${CACHE_MODULE_PREFIX}.${name}`, moduleInstance);
    }
    
    /**
     * 
     * @param {*} name 
     * @param {*} moduleInstance 
     */
    interface (name, moduleInstance) {
        if (_.isUndefined(moduleInstance)) return this.get(`${CACHE_INTERFACE_PREFIX}.${name}`);

        return this.bind(`${CACHE_INTERFACE_PREFIX}.${name}`, moduleInstance);
    }

    /**
     * 
     * @param {*} name 
     * @param {*} moduleInstance 
     */
    class (name, moduleInstance) {
        if (_.isUndefined(moduleInstance)) return this.get(`${CACHE_CLASS_PREFIX}.${name}`);

        return this.bind(`${CACHE_CLASS_PREFIX}.${name}`, moduleInstance);
    }

    get (path) {
        const value = _.get(this._cache, path);
        
        return value;
    }

    /**
     * Add alias to dependency in container
     * 
     * @param {string} current -
     * @param {string} alias -
     * 
     * @return {null} -
     */
    alias (current, alias) {

        this.bind(alias, this.get(current));

        return null;
    }
    
    /**
     * 
     * @param {*} path 
     * @param {*} value 
     * 
     * @exception {Error} -
     */
    rebind (path, value) {
        if (_.isUndefined(value)) {
            throw new Error(`[Context] Expected undefined value`);
        }

        _.set(this._cache, path, value);
    }

    /**
     * 
     * @return {object} new instance Context with same data
     */
    lazyClone () {
        const ctx = new Context();
        ctx._cache = _.mapValues(this._cache, (value, key) => {
            if (LIST_PREFIX.includes(key)) return { ...value };

            return value;
        });
        ctx._parent = this._parent;

        return ctx;
    }
}

module.exports = Context;
