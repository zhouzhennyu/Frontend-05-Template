const path = require('path');

module.exports = {
    entry: './src/main.js',
    output: {
    filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devtool: 'source-map',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [['@babel/plugin-transform-react-jsx', {pragma: 'createElement'}]]
                    }
                }
                
            }
        ]
    }
    // plugins: [
    //     "@babel/plugin-transform-react-jsx",
    //     {
    //         "throwIfNamespace": false, // defaults to true
    //         "runtime": "automatic", // defaults to classic
    //         "importSource": "custom-jsx-library" // defaults to react
    //     }
    // ]
}