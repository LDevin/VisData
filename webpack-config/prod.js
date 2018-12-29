var base = require('./base');
var Merge = require('webpack-merge');

var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanPlugin = require('clean-webpack-plugin');

var extractCss =  new ExtractTextPlugin({
    filename: 'static/css/[name].[chunkhash:8].css',
});

module.exports = Merge(base, {
    mode: 'production',

    module: {
        rules: [
            {
                test: /\.css$/,
                use: extractCss.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader'
                        }
                    ],
                })
            }
        ]
    },

    plugins: [
        new UglifyJsPlugin({
            uglifyOptions: {
                compress: {
                    warnings: false,
                },
                output: {
                    comments: false,
                },
            },
        }),
        extractCss,
    ]
})