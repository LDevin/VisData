const fs = require('fs')
const path = require('path')

const MOCK_DIR = path.resolve(__dirname, require('./config').mockdir);

const merge = dir => {
    let res = [];
    let list = fs.readdirSync(dir);
    list.forEach( file => {
        file = dir + '/' + file;
        let stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            res = res.concat(merge(file));
        } else if (path.extname(file) === '.js') {
            res.push(file)
        }
    })

    return res;
}

let db = {}
merge(MOCK_DIR).forEach(file => {
    const res = require(file);
    if (!Array.isArray(res)) {
        Object.assign(db, res)
    } else {
        if (db.data == null) {
            db.data = []
        }
        res.forEach( item => db.data.push(item))
    }
})

console.log(' merge db ', JSON.stringify(db));
module.exports = () => {
    return db;
}