const path = require('path');
const dotenv = require('dotenv');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');

dotenv.config();

module.exports = {
  entry: './dist/loadenv.js',
  mode: 'production',
  resolve : {
    fallback: {
      "fs": false,
      "tls": false,
      "net": false,
      "path": false,
      "zlib": false,
      "http": false,
      "https": false,
      "stream": false,
      "crypto": false,
      "os" : false,
    } 
  },
  plugins: [
    // new Dotenv(),
    new webpack.DefinePlugin({
      'process.env.APIKEY': JSON.stringify(process.env.APIKEY),
      // ...
    }),
  ],
  output: {
    filename: './loadenv.js',
    path: path.resolve(__dirname, './public'),
  },
};