var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var uglify = require('uglifyjs-webpack-plugin');

// 拼接我们的工作区路径为一个绝对路径
function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    devtool: '#source-map',
    entry: './src/example/main.js',
    output: {
        // 编译输出的根路径
        path: resolve('dist/example'),
        // 编译输出的文件名
        filename: 'main.min.js',
    },
    resolve: {
        // 自动补全的扩展名
        extensions: ['.js'],
        modules: [
            resolve('src'),
            resolve('node_modules')
        ],
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            include: [resolve('src'), resolve('test')]
        },{
            test:/\.css$/,
            use:['style-loader','css-loader']
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: resolve('src/example/index.html')
        }),
    ]
}