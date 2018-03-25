'use strict';

const YAML = require("js-yaml")
const fs = require('fs')
const pathJson = process.argv[2]

if (!pathJson) {
    console.log('Not set path to json file')
    return null;
}

let fileJson

try{
    fileJson = fs.readFileSync(pathJson)
} catch (error) {
    console.log('Can not read json file:', error.message)
    return null
}

const strJson = fileJson.toString()
let yamlString

try {
    yamlString = YAML.safeDump(YAML.safeLoad(strJson), {
        lineWidth: -1 // don't generate line folds
    })
} catch (error) {
    console.log('Can not convert json to yaml:', error.message)
    return null
}

process.stdout.write(yamlString);
