var webpack = require('webpack');
var proxySettings = require('./proxySettings');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:3000',
    'webpack/hot/only-dev-server',
    './src/app.js'
  ],
  debug: true,
  devtool: 'source-map',
  devServer: {
    proxy: proxySettings
  },
  output: {
    path: __dirname + '/static',
    filename: 'bundle.js'
  },
  module: {
    preLoaders: [
      {
        test: /(\.js$|\.jsx$)/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      }
    ],
    loaders: [
      { test: /\.js?$/, loaders: ['react-hot', 'babel-loader'], exclude: /node_modules/ },
      // { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.woff2?$/, loader: 'url-loader?limit=25000' },
      { test: /\.(eot|svg|ttf)?$/, loader: 'file-loader' },
      { test: /\.scss$/, loader: 'style!css!sass' }
    ]
  },
  eslint: {
    configFile: '.eslintrc.yml'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
