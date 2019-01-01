const nodeExternals = require('webpack-node-externals')
const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const rootPath = path.join(__dirname, '../../')
const entryPath = path.join(rootPath, 'server/index.js')
const outputPath = path.join(rootPath, 'build-server')

const cleanWebpackBuild = new CleanWebpackPlugin(['build-server'], {
  root: rootPath,
  verbose: true,
  dry: false,
  exclude: ['.gitkeep']
})

module.exports = {
  name: 'server',
  target: 'node',
  entry: [
    '@babel/polyfill',
    entryPath
  ],
  externals: [nodeExternals()],
  output: {
    path: outputPath,
    filename: 'server.js'
  },
  resolveLoader: {
    moduleExtensions: ['-loader']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: ['babel']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx']
  },
  plugins: [
    cleanWebpackBuild,
    new webpack.IgnorePlugin(/\.(css|less|scss)$/)
  ]
}
