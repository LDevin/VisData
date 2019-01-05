const {middleware,server} = require('faker-mock');
const express = require('express');
const config = require('../utils/config');
const db = require('../utils/mock-merge')(config.fakerdir);

const app = express()
const PORT = process.env.MOCK_PORT | config.port;

app.use(middleware(db.data, 'zh_CN'))
app.listen(PORT, (err) => {
    if (!err) {
        console.log(`\nthe faker-mock server is running on port:${PORT}`)
    }
})