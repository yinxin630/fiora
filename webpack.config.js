module.exports = {
    entry: './src/javascript/app.jsx',
    output: {
        path: __dirname + '/src/',
        filename: 'app.js'
    },
    watch: true,
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'stage-0', 'react'],
                }
            }
        ]
    }
};