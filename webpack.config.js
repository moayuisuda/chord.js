const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: {
        main: './src/index.js'
    },
    output: {
        libraryTarget: 'umd',
        library: 'chords',
        path: path.resolve(__dirname, './dist'),
        filename: 'chord.js'
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist')
    },
}