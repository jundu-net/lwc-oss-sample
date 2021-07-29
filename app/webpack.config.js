const HtmlWebpackPlugin = require('html-webpack-plugin');
const LwcWebpackPlugin = require('lwc-webpack-plugin')
// Htmlテンプレートを複数指定するためlwc-services内で必ず定義されるHtmlWebpackPluginとは重複しない名前のプラグインを作成
class HtmlWebpackPlugin2 extends HtmlWebpackPlugin {}

module.exports = {
    entry: {
        index: ['./src/prepare.js', './src/index.js'],  // 日付フォーマット関連処理を上書きするため先にprepare.jsを読み込む
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
        }),
        new LwcWebpackPlugin({  // 日本のロケール対応
            stylesheetConfig: {},
            outputConfig: {
                compat: false,
                minify: true,
                env: {
                    NODE_ENV: 'production'
                },
                format: 'amd'
            },
            experimentalDynamicComponent: {},
            modules: [
                {
                    "name": "@salesforce/i18n/lang",
                    "path": __dirname + "/src/scopedImports/@salesforce-i18n-lang.js"
                },
                {
                    "name": "@salesforce/i18n/dir",
                    "path": __dirname + "/src/scopedImports/@salesforce-i18n-dir.js"
                },
                {
                    "name": "@salesforce/i18n/locale",
                    "path": __dirname + "/src/scopedImports/@salesforce-i18n-locale.js"
                },
                {
                    "name": "@salesforce/i18n/timeZone",
                    "path": __dirname + "/src/scopedImports/@salesforce-i18n-timeZone.js"
                },
                {
                    "name": "@salesforce/i18n/currency",
                    "path": __dirname + "/src/scopedImports/@salesforce-i18n-currency.js"
                },
                {
                    "name": "@salesforce/i18n/firstDayOfWeek",
                    "path": __dirname + "/src/scopedImports/@salesforce-i18n-firstDayOfWeek.js"
                },
                {
                    "name": "@salesforce/i18n/dateTime.shortDateFormat",
                    "path": __dirname + "/src/scopedImports/@salesforce-i18n-dateTime.shortDateFormat.js"
                },
                {
                    "name": "@salesforce/i18n/dateTime.mediumDateFormat",
                    "path": __dirname + "/src/scopedImports/@salesforce-i18n-dateTime.mediumDateFormat.js"
                },
                {
                    "name": "@salesforce/i18n/dateTime.longDateFormat",
                    "path": __dirname + "/src/scopedImports/@salesforce-i18n-dateTime.longDateFormat.js"
                },
                {
                    "name": "@salesforce/i18n/dateTime.shortDateTimeFormat",
                    "path": __dirname + "/src/scopedImports/@salesforce-i18n-dateTime.shortDateTimeFormat.js"
                },
                {
                    "name": "@salesforce/i18n/dateTime.mediumDateTimeFormat",
                    "path": __dirname + "/src/scopedImports/@salesforce-i18n-dateTime.mediumDateTimeFormat.js"
                },
                {
                    "name": "@salesforce/i18n/dateTime.shortTimeFormat",
                    "path": __dirname + "/src/scopedImports/@salesforce-i18n-dateTime.shortTimeFormat.js"
                },
                {
                    "name": "@salesforce/i18n/dateTime.mediumTimeFormat",
                    "path": __dirname + "/src/scopedImports/@salesforce-i18n-dateTime.mediumTimeFormat.js"
                },
                {
                    "name": "@salesforce/i18n/number.numberFormat",
                    "path": __dirname + "/src/scopedImports/@salesforce-i18n-number.numberFormat.js"
                },
                {
                    "name": "@salesforce/i18n/number.percentFormat",
                    "path": __dirname + "/src/scopedImports/@salesforce-i18n-number.percentFormat.js"
                },
                {
                    "name": "@salesforce/i18n/number.currencyFormat",
                    "path": __dirname + "/src/scopedImports/@salesforce-i18n-number.currencyFormat.js"
                },
                {
                    "name": "@salesforce/i18n/number.currencySymbol",
                    "path": __dirname + "/src/scopedImports/@salesforce-i18n-number.currencySymbol.js"
                },
                {
                    "name": "@salesforce/i18n/number.groupingSeparator",
                    "path": __dirname + "/src/scopedImports/@salesforce-i18n-number.groupingSeparator.js"
                },
                {
                    "name": "@salesforce/i18n/number.decimalSeparator",
                    "path": __dirname + "/src/scopedImports/@salesforce-i18n-number.decimalSeparator.js"
                },
                {
                    "name": "@salesforce/i18n/showJapaneseCalendar",
                    "path": __dirname + "/src/scopedImports/@salesforce-i18n-showJapaneseCalendar.js"
                },
                {
                    "name": "@salesforce/label/Duration.secondsLater",
                    "path":  __dirname + "/src/scopedImports/@salesforce-label-Duration.secondsLater.js"
                },
                {
                    "name": "@salesforce/label/Duration.secondsAgo",
                    "path":  __dirname + "/src/scopedImports/@salesforce-label-Duration.secondsAgo.js"
                },
            ]
        })
    ]
};