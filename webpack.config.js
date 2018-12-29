let finalConfig = {}

let ENV = process.env.NODE_ENV;
switch(ENV) {
    case 'dev':
        finalConfig = require('./webpack-config/dev');
        break;
    case 'prod':
        finalConfig = require('./webpack-config/prod');
        break;
    default:
        break;
}

module.exports = finalConfig;