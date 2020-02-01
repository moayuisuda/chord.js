const path = require('path');

module.exports = {
    devtool: 'source-map',
    entry: {
        main: './src/index.js'
    },
    output: {
        libraryTarget: 'umd',
        library: 'chord',
        path: path.resolve(__dirname, './dist'),
        filename: 'chord.js'
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist')
    },
}