const webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const rootPath = path.join(__dirname, '../../')
const entryPath = path.join(rootPath, 'src/client/index.jsx')
const outputPath = path.join(rootPath, 'build')
const fileContextPath = path.join(rootPath, 'src/shared/assets')

const cleanWebpackBuild = new CleanWebpackPlugin(['build'], {
  root: rootPath,
  verbose: true,
  dry: false
})

module.exports = {
  name: 'client',
  target: 'web',
  entry: [
    '@babel/polyfill',
    entryPath
  ],
  output: {
    path: outputPath,
    filename: 'js/app.js',
    publicPath: '/'
  },
  resolveLoader: {
    moduleExtensions: ['-loader']
  },
  module: {
    rules: [
      {
        test: /\.js?x$/,
        loader: 'eslint',
        exclude: /node_modules/,
        enforce: 'pre'
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: ['babel']
      },
      {
        test: /\.(jpe?g|png|gif|svg|ttf|woff|eot|mp4|woff2)$/i,
        loader: 'file-loader',
        query: {
          name: 'assets/[path][name].[ext]',
          context: fileContextPath
        }
      }
    ]
  },
  plugins: [
    cleanWebpackBuild,
    new webpack.ProvidePlugin({
      'Promise': 'es6-promise',
      'fetch': 'imports?this=>global!exports?global.fetch!isomorphic-fetch'
    })
  ],
  resolve: {
    extensions: ['.js', '.json', '.jsx']
  }
}
