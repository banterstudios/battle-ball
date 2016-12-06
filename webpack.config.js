
var HtmlWebpackPlugin = require('html-webpack-plugin')
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/app/index.html',
  filename: 'index.html',
  inject: 'body'
});
module.exports = {
  entry: [
    './app/index.js'
  ],
  output: {
    path: __dirname + '/dist',
    filename: "index_bundle.js"
  },
  module: {
    loaders: [
      {test: /\.css$/, loader: "style-loader!css-loader"},
      {test: /\.less$/, loader: "style!css!less"},
      {test: /\.(jpe?g|png|gif|svg|ttf)$/i, loader: "file-loader" },
    ]
  },
  plugins: [HTMLWebpackPluginConfig],

  //devtool: 'source-map'
};