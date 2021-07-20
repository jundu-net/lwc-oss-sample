// Find the full example of all available configuration options at
// https://github.com/muenzpraeger/create-lwc-app/blob/main/packages/lwc-services/example/lwc-services.config.js
module.exports = {
    resources: [
        {
            from: 'src/resources/',
            to: 'dist/resources/'
        },
        // {
        //     from: 'node_modules/@salesforce-ux/design-system/assets',
        //     to: 'src/assets'
        // },
        {
            from: 'node_modules/@salesforce-ux/design-system/assets',
            to: 'dist/assets'
        },
        // {
        //     from: 'node_modules/@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.css',
        //     to: 'dist/assets/styles/salesforce-lightning-design-system.min.css'
        // },
    ],
    devServer: {
        historyApiFallback: {
            index: 'index.html'
        }
        // port: 3001,
        // host: 'localhost',
        // open: false,
        // stats: 'errors-only',
        // noInfo: true,
        // contentBase: './src/client'
    },
};
