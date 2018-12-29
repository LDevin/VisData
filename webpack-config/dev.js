var base = require('./base');
var Merge = require('webpack-merge');

var devServer = require('./inherit/devServer.config');

module.exports = Merge(base, devServer, {
    
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader', 
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        }
                    }
                ],
            }
        ]
    },

    devtool: 'inline-source-map',
    mode: 'development',
})