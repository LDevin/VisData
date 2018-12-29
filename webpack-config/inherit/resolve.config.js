var path = require('path');

var IS_PROD = process.env.NODE_EV === 'prod';

module.exports = {
    resolve: {
        extensions: ['.js', '.css', '.less','.jsx','.json'],
        alias: {
            config: path.resolve(process.cwd(), IS_PROD ? './src/public/config/prod' : './src/public/config/dev'),
            store: path.resolve(process.cwd(), './src/models/store'),
            actions: path.resolve(process.cwd(), './src/models/actions/actions'),
            helper: path.resolve(process.cwd(), './src/models/libs/helper/api'),
            utils: path.resolve(process.cwd(), './src/models/utils/util'),
            consts: path.resolve(process.cwd(), './src/models/utils/const'),
            bindActions: path.resolve(process.cwd(), './src/models/actions/bind-actions'),
            mapStyle: path.resolve(process.cwd(), './src/public/resources/data/map_local_style'),
            buildLayer: path.resolve(process.cwd(), './src/public/resources/data/longgang_build'),

            'mapbox-gl$': path.resolve(process.cwd(),'./node_modules/mapbox-gl/dist/mapbox-gl'),
        }
    }
}