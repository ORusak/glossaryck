'use strict'

module.exports = (wallaby) => {

    return {
        env: {
            type: 'node',
            runner: 'node'
        },
        files: [
            { pattern: 'src/sandbox/**/test/*.js', ignore: true },
            'src/sandbox/**/*.js',
            '!src/sandbox/grid-gane/*.js',
        ],
        tests: [
            '!src/sandbox/lib/entity-relation/test/*.js',
            'src/sandbox/**/test/*.js',
        ],
        testFramework: 'ava',
        debug: false
    };
};
