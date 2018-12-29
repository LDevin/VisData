const path = require('path');
const webpack = require('webpack');
const Merge = require('webpack-merge');
const cleanWebpackPlugin = require('clean-webpack-plugin');

const dirVars = require('./var/dir-vars.config');

const entries = require('./inherit/entry.config'),
    plugins = require('./inherit/plugins.config'),
    alias = require('./inherit/resolve.config'),
    output = require('./inherit/output.config');

module.exports = Merge(entries, alias, plugins, output, {

    optimization: {
        splitChunks: {
            cacheGroups: {
                common: {  // 抽离自己写的公共代码
                    chunks: "initial",
                    name: "common", // 打包后的文件名，任意命名
                    minChunks: 2,//最小引用2次
                    minSize: 0, // 只要超出0字节就生成一个新包
                },
                vendor: {   // 抽离第三方插件
                    test: /node_modules/,   // 指定是node_modules下的第三方包
                    chunks: 'initial',
                    name: 'vendor',  // 打包后的文件名，任意命名
                    // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
                    priority: 10,
                },
            }
        }
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(process.cwd(), './src')
                ],
                exclude: [
                    path.resolve(process.cwd(), './node_modules')
                ],
                use: [
                    {
                        loader: 'babel-loader',
                    }
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[hash:8].[ext]',
                    outputPath: 'static/images/',
                }
            },
            
        ]
    },

    plugins: [
        new cleanWebpackPlugin([dirVars.buildDir], {
            root: process.cwd(),
            exclude: [],
        }), 
        new webpack.HotModuleReplacementPlugin(),
    ]

})
