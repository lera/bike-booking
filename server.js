const express = require('express');
const api = require('./api');

const app = express();

// Static files `/public` directory
app.use(express.static('public'));

// The API end points
app.use('/api', api());

// Start server
app.listen(3000, function () {
    console.log('\nWeb server started http://localhost:3000\n');
});

// Webpack dev server
const webpack = require('webpack');
const WebpackDevServer = require('Webpack-dev-server');

const config = require("./webpack.config.js");

config.entry.app.unshift("webpack-dev-server/client?http://localhost:8080/");

const compiler = webpack(config);

const server = new WebpackDevServer(compiler, {
    hot: true
});

server.listen(8080);