const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    devtool: 'source-map',
    entry: {
        main: './src/instance.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'index.js',
        chunkFilename: 'chunks/[name].min.js'
    },
    devServer: {
        port: 9999,
        contentBase: path.join(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                "css-loader"
              ]
        }]
    },
    plugins: [
        new BundleAnalyzerPlugin(),
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
            chunkFilename: "css/[id].css"
          })
    ]
}