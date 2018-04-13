'use strict';



const util = require('util');
const merge = util._extend;
const path = require('path');
const join = path.join;


const HOME = '/Users/ora'
const ROOT_PATH = join(HOME, 'Documents/repo');
const LOGS_PATH = join(ROOT_PATH, '.logs');

const apps = [];
const deploy = {};
const config = module.exports = {apps, deploy};


/**
 * Предзаполнение параметрами по умолчанию
 * @param opts
 */
function addApp(opts) {
	opts.script = opts.script || 'app.js';
    const appConfig = merge({
        script: join(ROOT_PATH, opts.name, opts.script),
        out_file: join(LOGS_PATH, `${opts.name}.log`),
        error_file: join(LOGS_PATH, `${opts.name}.log`),
        cwd: join(ROOT_PATH, opts.name),
        env: {
            NODE_ENV: "development"
        }
    }, opts);
	apps.push(appConfig);
}

/**
 * Обертка для запуска бинарников
 * @param params
 */
function exec(params) {
    const cmdConfig = merge({
        interpreter: 'none',
        script: params.cmd,
        cwd: null
    }, params);
    delete cmdConfig.cmd;
    addApp(cmdConfig)
}

// Node.JS Backend service
addApp({ name: 'app3' });

// Node.JS Docs Flow service
addApp({ name: 'app2' });


// Node.JS Documents service
addApp({ name: 'app4' });

// Node.JS Reference Contractors service
addApp({
    name: 'app1',
    env: {
        NODE_ENV: 'development',
        PORT: 8080,
        DEBUG: 'swagger-tools:middleware:*',
        CORS_ALLOW_HEADERS: 'localhost,null'
    }
});
