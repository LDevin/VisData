var webpack = require('webpack');
var path = require('path');
const fs = require('fs');

var htmlWebpackPlugin = require('html-webpack-plugin');

var dirVars = require('../var/dir-vars.config');
var viewsArr = require('../var/views-entries.config');

var titleContent = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../var/page.title.json'), 'utf-8'));
console.log('titleContent ', titleContent);

var configPlugins = [];
viewsArr.forEach( view => {
    const htmlPlugin = new htmlWebpackPlugin({
        filename: `${view}/index.html`,
        template: path.resolve(dirVars.templateDir, `./template.html`),
        title: titleContent[view] != undefined ? titleContent[view]:'',
        chunks: ['common', 'vendor', view],
        inject: 'body',
        favicon: path.resolve(dirVars.resourcesDir, './images/icon.png'),
        hash: true,
        chunksSortMode: "manual",
        minify: {
            removeComments: true,
            collapseWhitespace: true
        }
    });
    configPlugins.push(htmlPlugin);
});

module.exports = {
    plugins: configPlugins
};