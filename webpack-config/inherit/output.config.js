module.exports = {
    output: {
        path: require('../var/dir-vars.config').buildDir,
        publicPath: '/',
        filename: 'js/[name]/entry.[hash:8].js',
        chunkFilename: 'js/[name].[hash:6].bundle.js',
    }
}