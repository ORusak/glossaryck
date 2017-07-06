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
        },
        env_mosreg: {
            NODE_ENV: "mosreg"
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



// ActiveMQ
exec({
    name: 'activemq',
    cmd: 'bash',
    args: '-c "/usr/local/Cellar/activemq/5.14.4/bin/activemq console"',
});

// IDE server
// exec({
//     name: 'ideamng',
//     cmd: join(HOME, '_work/_SysUtils/IDEA-LServer/IntelliJIDEALicenseServer_darwin_amd64'),
//     args: '-p 9966 -u Surgut.Inc',
//
// });

// Node.JS Backend service
addApp({ name: 'backend' });

// Node.JS Docs Flow service
addApp({ name: 'docs_flow' });


// Node.JS Documents service
addApp({ name: 'documents' });

// Node.JS Reference Contractors service
addApp({
    name: 'reference_contractors',
    env: {
        NODE_ENV: 'development',
        PORT: 8080,
        DEBUG: 'swagger-tools:middleware:*',
        CORS_ALLOW_HEADERS: 'localhost,null'
    }
});

// Node.JS Business Entity service
addApp({ name: 'business-entity' });

// Node.JS Storage service
addApp({ name: 'storage' });

// Node.JS Uploader service
addApp({ name: 'uploader' });


// Node.JS Print Template service
// addApp({ name: 'print-template' });

// Node.JS Frontend service
// addApp({
//     name: 'frontend',
//     script: 'server/server.coffee',
//     interpreter: join(ROOT_PATH, 'frontend/node_modules/.bin/coffee')
// });


// console.log(JSON.stringify(config, null, '  '));

