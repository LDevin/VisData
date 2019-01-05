
const fs = require('fs');
const path = require('path');

const fileName = {builds: path.resolve(__dirname, '../org/builds.json')}
const targetDir = path.resolve(__dirname,'../json-server/test/map/');

function genBuild(file, target) {
    fs.readFile(file, (err, res) => {
        if (err) {
            return console.error(err)
        }

        const items = JSON.parse(res)
        const len = Array.isArray(items) ? items.length : 0;

        console.log('length=', Array.isArray(items) ? items.length : 'not array!')
        
        let offset = len >= 10000 ? 10000 : len;
        let _start = 0, loops = Math.ceil(len / offset);

        let _resBuilds = [];

        for (let i = 0; i < loops; i++) {
            let _builds = [], _resBuildsObj={};

            for (let j = _start; j < offset; ++j) {
                _builds.push(items[j])
            }
            _start = offset;
            offset += 10000; 

            if (offset >= len) {
                offset = len;
            }
            _resBuildsObj['builds'+(i+1)] = _builds
            _resBuilds.push(_resBuildsObj);
        }

        _start= 0;
        _resBuilds.forEach( item => {
            fs.writeFile(path.join(target, 'builds'+ ++_start + '.js'), 
            'module.exports=' + JSON.stringify(item), err=> {
                if (err) {
                    return console.error(err)
                }
                console.log(`生成文件成功`)
            })
        })
        console.log('_builds length=',_resBuilds.length)
    })
}

function genCoordinates() {
    fs.readFile(path.resolve(__dirname, '../org/dangers.json'), (err, res) => {
        if (err) {
            return console.error(err)
        }

        const items = JSON.parse(res)
        const len = Array.isArray(items) ? items.length : 0;

        console.log('length=', Array.isArray(items) ? items.length : 'not array!')

        let arr = [];
        items.result.forEach(e=> {
            let obj={coordinates:[]};
            arr.push({coordinates:[(e.longitude / 100) + 108.20, (e.latitude / 100) + 22.70]})
        })

        fs.writeFile(path.resolve(__dirname, '../org/parse-danger.json'), JSON.stringify(arr), err=> {
            if (err) {
                return console.error(err)
            }
            console.log(`生成文件成功`)
        })
    })
}

module.exports = {
    builds: genBuild(fileName.builds,targetDir),
    genCoor: genCoordinates()
}