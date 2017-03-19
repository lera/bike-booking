var path = require("path");

module.exports = {
     entry: {
        app: ["./app/main.js"]
    },
    output: {
       path: path.resolve('./public/'),
       filename: "bundle.js",
       sourceMapFilename: '[file].map',
       devtoolLineToLine: true
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'stage-2']
                }
            }
        ]
    }
};