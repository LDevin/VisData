var path = require('path');
var dirVars = require('../var/dir-vars.config');
var viewsArr = require('../var/views-entries.config');

var entries = {};
viewsArr.forEach( view => {
    entries[view] = path.resolve(dirVars.viewsDir, view + '/app.js')
});

module.exports = {
    entry: entries
};