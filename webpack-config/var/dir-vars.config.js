const {resolve} = require('path');
let moduleExports = {};

moduleExports.staticRootDir = resolve(__dirname, '../../');
moduleExports.srcRootDir = resolve(moduleExports.staticRootDir, 'src');
moduleExports.viewsDir = resolve(moduleExports.srcRootDir, 'views');
moduleExports.buildDir = resolve(moduleExports.staticRootDir, 'build');
moduleExports.publicDir = resolve(moduleExports.srcRootDir, 'public');
moduleExports.templateDir = resolve(moduleExports.publicDir, 'templates');
moduleExports.resourcesDir = resolve(moduleExports.publicDir, 'resources');

module.exports = moduleExports;