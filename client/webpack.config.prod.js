const merge = require('webpack-merge');
const common = require('./webpack.config.common.js');
const publicDir = 'public';
const path = require('path');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map'
});