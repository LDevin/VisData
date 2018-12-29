const path = require('path');
const opn = require('opn');

module.exports = {
    devServer: {
        inline: true,
        hot: true,
        host: '172.16.1.32',
        port: 8088,
        compress: true,
        contentBase: require('../var/dir-vars.config').buildDir,
        publicPath: '/',
        historyApiFallback: true,
        disableHostCheck :true,
        proxy: {
            '/api/v1/bigData/*': { 
                target: 'http://192.168.1.151:8800',//'http://47.106.132.128:8800',
                secure: false, // 接受 运行在 https 上的服务
                changeOrigin: true
            },
            '/oauth/token': { 
                target: 'http://192.168.1.151:8800',//'http://47.106.132.128:8800',
                secure: false, // 接受 运行在 https 上的服务
                changeOrigin: true
            },
        },    
        after() {
            opn('http://' + this.host + ':' + this.port + this.publicPath + 'vis/index');
        },
    }
}