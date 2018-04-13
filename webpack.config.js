const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WriteFilePlugin = require('write-file-webpack-plugin')

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.join(__dirname, '/shared/index.handlebars'),
  filename: 'index.handlebars',
  inject: 'body'
})

const HTMLWebpackHardDiskPlugin = new HtmlWebpackHarddiskPlugin({
  outputPath: path.join(__dirname, '/build/views')
})

module.exports = {
  name: 'client',
  mode: 'development',
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    './shared/index.js'
  ],
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'js/app.js',
    publicPath: '/static/'
  },
  resolveLoader: {
    moduleExtensions: ['-loader']
  },
  module: {
    rules: [
      // Pre-loaders
      {
        test: /\.js$/,
        loader: 'eslint',
        exclude: /node_modules/,
        enforce: 'pre'
      },
      // Loaders
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel']
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader?-autoprefixer&sourceMap&minimize',
          'postcss-loader',
          'sass-loader?sourceMap'
        ]
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.(jpe?g|png|gif|svg|ttf|woff|eot|mp4|woff2)$/i,
        loader: 'file-loader',
        query: {
          name: 'assets/[path][name].[ext]',
          context: './shared/assets'
        }
      }
    ]
  },
  plugins: [
    HTMLWebpackPluginConfig,
    HTMLWebpackHardDiskPlugin,
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      'Promise': 'es6-promise',
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
  ],
  devtool: 'cheap-module-eval-source-map',
  resolve: {
    extensions: ['.js', '.json', '.jsx']
  }
}
