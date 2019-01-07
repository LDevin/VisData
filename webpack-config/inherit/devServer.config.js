const path = require('path');
const opn = require('opn');

const mode = process.env.MOCK_ENV;
const bind_ip = process.env.BIND_IP ? process.env.BIND_IP : 'localhost';

const proDev = {
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
}

const proMock = {
    '/api/v1/*': { 
        target: `http://${bind_ip}:9000`,
        secure: false, // 接受 运行在 https 上的服务
        changeOrigin: true
    },
    '/oauth/token': { 
        target: `http://${bind_ip}:9000`,
        secure: false, // 接受 运行在 https 上的服务
        changeOrigin: true
    },
}

module.exports = {
    devServer: {
        inline: true,
        hot: true,
        host: bind_ip,
        port: 8088,
        compress: true,
        contentBase: require('../var/dir-vars.config').buildDir,
        publicPath: '/',
        historyApiFallback: true,
        disableHostCheck :true,
        proxy: mode === 'mock' ? proMock : proDev,    
        after() {
            opn('http://' + this.host + ':' + this.port + this.publicPath + 'vis/index');
        },
    }
}