const HtmlWebpackPlugin = require('html-webpack-plugin');
// Htmlテンプレートを複数指定するためlwc-services内で必ず定義されるHtmlWebpackPluginとは重複しない名前のプラグインを作成
class HtmlWebpackPlugin2 extends HtmlWebpackPlugin {}

module.exports = {
    entry: {
        index: './src/index.js',
        login: './src/login.js',
    },
    // output: {
    //     filename: '[name].js',
    //     path: __dirname + '/dist'
    // }
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            chunks: ['index']
        }),
        new HtmlWebpackPlugin2({    // webpack-plugin-overridesで削除されないように別名クラス指定
            filename: 'login.html',
            template: './src/login.html',
            chunks: ['login']
        })
    ]
};