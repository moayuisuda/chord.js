const path = require('path');

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    entry: {
        main: './src/index.js'
    },
    output: {
        libraryTarget: 'umd',
        library: 'rad',
        path: path.resolve(__dirname, './dist'),
        filename: 'rad.js'
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist')
    },
}