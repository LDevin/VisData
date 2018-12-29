const fs = require('fs')
const path = require('path')

const MOCK_DIR = path.resolve(__dirname, 'test');

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
    Object.assign(db, require(file))
})

console.log(' merge db ', JSON.stringify(db));
module.exports = () => {
    return db;
}