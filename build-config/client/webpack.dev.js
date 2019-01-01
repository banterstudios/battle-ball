const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpackMerge = require('webpack-merge')
const commonConfig = require('./webpack.common')

const rootPath = path.join(__dirname, '../../')
const buildViewsPath = path.join(rootPath, '/build/views')
const htmlTemplatePath = path.join(rootPath, 'server/templates/index.handlebars')

const HTMLWebpackHardDiskPlugin = new HtmlWebpackHarddiskPlugin({
  outputPath: buildViewsPath
})

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: htmlTemplatePath,
  filename: 'index.handlebars',
  alwaysWriteToDisk: true,
  inject: 'body'
})

module.exports = webpackMerge.strategy({
  plugins: 'append'
})(commonConfig, {
  mode: 'development',
  entry: [
    'webpack-hot-middleware/client'
  ],
  plugins: [
    HTMLWebpackPluginConfig,
    HTMLWebpackHardDiskPlugin,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    })
  ],
  devtool: 'cheap-module-eval-source-map'
})
