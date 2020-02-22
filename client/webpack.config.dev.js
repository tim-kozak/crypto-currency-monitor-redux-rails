const merge = require('webpack-merge');
const common = require('./webpack.config.common.js');
const publicDir = 'public';
const path = require('path');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, publicDir),
        port: 9000,
        hot: true,
        open: true,
        compress: true,
        historyApiFallback: true
    }
});