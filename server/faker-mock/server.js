const {server} = require('faker-mock');
const config = require('../utils/config');
const db = require('../utils/mock-merge')();

const PORT = process.env.MOCK_PORT | config.port;

server({port: PORT, config: db.data})