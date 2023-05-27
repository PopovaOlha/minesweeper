const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'my-bundle.js',
    },
    module : {
        rules: [
            { 
              test: /\.scss$/i,
              use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
              test: /\.js$/,
              exclude: /node_modules/,
              use: ['babel-loader'],
            },
            {
              test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
              type: 'asset/resource',
            },
            {
              test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
              type: 'asset/inline',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({ template: 'src/index.html'}),
        new MiniCssExtractPlugin({ filename: 'styles.css'}),
        new CleanWebpackPlugin(),
    ],
    devServer: {
        port: 1111,
        open: true,
    }
}