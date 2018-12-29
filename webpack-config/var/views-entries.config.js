var glob = require('glob');
var dirVars = require('./dir-vars.config');

var options = {
    cwd: dirVars.viewsDir,
    sync: true,
};

var globInstance = new glob.Glob('!(_)*/!(_)*', options);
module.exports = globInstance.found;