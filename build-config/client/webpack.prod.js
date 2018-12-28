const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const webpackMerge = require('webpack-merge')
const commonConfig = require('./webpack.common')

const rootPath = path.resolve(__dirname, '../../')
const htmlTemplatePath = path.resolve(rootPath, 'server/templates/index.handlebars')

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: htmlTemplatePath,
  filename: 'views/index.handlebars',
  alwaysWriteToDisk: true,
  inject: 'body',
  minify: {
    collapseWhitespace: true,
    collapseInlineTagWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true
  }
})

module.exports = webpackMerge(commonConfig, {
  mode: 'production',
  output: {
    filename: 'js/app.[hash].js'
  },
  plugins: [
    HTMLWebpackPluginConfig,
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new CompressionWebpackPlugin({
      exclude: /\.handlebars$/
    })
  ],
  devtool: 'source-map',
  performance: {
    hints: false
  },
  optimization: {
    sideEffects: false,
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCssAssetsPlugin({})
    ]
  }
})
